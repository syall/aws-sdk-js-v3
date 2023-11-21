import { HttpRequest } from "@smithy/protocol-http";
import {
  AwsCredentialIdentity,
  HttpRequest as IHttpRequest,
  HttpSigner,
  HttpResponse,
  AuthScheme,
  HandlerExecutionContext,
  RequestSigner,
  SelectedHttpAuthScheme,
  HttpAuthOption,
} from "@smithy/types";
import {
  getSkewCorrectedDate,
  getUpdatedSystemClockOffset,
  getDateHeader
} from "../utils";
import { ServiceException } from "@smithy/smithy-client";
import { throwAWSSDKSigningPropertyError } from "./throwAWSSDKSigningPropertyError";
import { getSmithyContext } from "@smithy/util-middleware";

interface WithSystemClockOffset {
  systemClockOffset: number;
}

interface AWSSDKSigV4AuthSigningProperties {
  config: WithSystemClockOffset;
  signer: RequestSigner;
  signingRegion: string;
  signingName: string;
}

interface AWSSDKSigV4AuthSmithyContext extends Record<string, unknown> {
  selectedHttpAuthScheme?: SelectedHttpAuthScheme;
}

interface AWSSDKSigV4Exception extends ServiceException {
  ServerTime?: string;
}

const validateSigningProperties = async (
  signingProperties: Record<string, unknown>
): Promise<AWSSDKSigV4AuthSigningProperties> => {
  const context = throwAWSSDKSigningPropertyError("context",
    signingProperties.context as HandlerExecutionContext | undefined);
  const authScheme = context
    .endpointV2
    ?.properties
    ?.authSchemes
    ?.[0];
  const signerFunction = throwAWSSDKSigningPropertyError("signer",
    signingProperties.signer as ((authScheme?: AuthScheme) => Promise<RequestSigner>) | undefined);
  const signer = await signerFunction(authScheme);
  const config = throwAWSSDKSigningPropertyError("config",
    signingProperties.config as WithSystemClockOffset | undefined);
  const smithyContext: AWSSDKSigV4AuthSmithyContext = getSmithyContext(context);
  const httpAuthOption = throwAWSSDKSigningPropertyError("httpAuthOption",
    smithyContext?.selectedHttpAuthScheme?.httpAuthOption as HttpAuthOption | undefined);
  const signingRegionSetProperty =
    (httpAuthOption.signingProperties?.signingRegionSet as string[] | undefined)?.join(",");
  const signingRegionProperty =
    httpAuthOption.signingProperties?.signingRegion as string | undefined;
  const signingRegion: string = httpAuthOption.schemeId === "aws.auth#sigv4a"
    ? throwAWSSDKSigningPropertyError("signingRegionSet", signingRegionSetProperty)
    : throwAWSSDKSigningPropertyError("signingRegion", signingRegionProperty);
  const signingName = throwAWSSDKSigningPropertyError("signingName",
    httpAuthOption.signingProperties?.signingName as string | undefined);
  return {
    config,
    signer,
    signingRegion,
    signingName,
  };
};

/**
 * @internal
 */
export class AWSSDKSigV4Signer implements HttpSigner {
  async sign(
    httpRequest: IHttpRequest,
    /**
     * `identity` is bound in {@link resolveAWSSDKSigV4Config}
     */
    identity: AwsCredentialIdentity,
    signingProperties: Record<string, unknown>
  ): Promise<IHttpRequest> {
    if (!HttpRequest.isInstance(httpRequest)) {
      throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    }
    const {
      config,
      signer,
      signingRegion,
      signingName,
    } = await validateSigningProperties(signingProperties);

    return await signer.sign(httpRequest, {
      signingDate: getSkewCorrectedDate(config.systemClockOffset),
      signingRegion: signingRegion,
      signingService: signingName,
    });
  }

  errorHandler(signingProperties: Record<string, unknown>): (error: AWSSDKSigV4Exception) => never {
    return (error) => {
      const serverTime: string | undefined = error.ServerTime ?? getDateHeader(error.$response);
      if (serverTime) {
        const config = throwAWSSDKSigningPropertyError("config",
          signingProperties.config as WithSystemClockOffset | undefined);
        config.systemClockOffset = getUpdatedSystemClockOffset(serverTime, config.systemClockOffset);
      }
      throw error;
    };
  }

  successHandler(httpResponse: HttpResponse | unknown, signingProperties: Record<string, unknown>): void {
    const dateHeader = getDateHeader(httpResponse);
    if (dateHeader) {
      const config = throwAWSSDKSigningPropertyError("config",
        signingProperties.config as WithSystemClockOffset | undefined);
      config.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, config.systemClockOffset);
    }
  };
}
