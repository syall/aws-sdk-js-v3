import { doesIdentityRequireRefresh, isIdentityExpired, memoizeIdentityProvider } from "@smithy/core";
import { SignatureV4, SignatureV4CryptoInit, SignatureV4Init } from "@smithy/signature-v4";
import {
  AuthScheme,
  AwsCredentialIdentity,
  AwsCredentialIdentityProvider,
  ChecksumConstructor,
  HashConstructor,
  MemoizedProvider,
  Provider,
  RegionInfo,
  RegionInfoProvider,
  RequestSigner,
} from "@smithy/types";
import {
  // Move to @smithy/core
  normalizeProvider,
} from "@smithy/util-middleware";

/**
 * @internal
 */
export interface AWSSDKSigV4AuthInputConfig {
  /**
   * The credentials used to sign requests.
   */
  credentials?: AwsCredentialIdentity | AwsCredentialIdentityProvider;

  /**
   * The signer to use when signing requests.
   */
  signer?: RequestSigner | ((authScheme?: AuthScheme) => Promise<RequestSigner>);

  /**
   * Whether to escape request path when signing the request.
   */
  signingEscapePath?: boolean;

  /**
   * An offset value in milliseconds to apply to all signing times.
   */
  systemClockOffset?: number;

  /**
   * The region where you want to sign your request against. This
   * can be different to the region in the endpoint.
   */
  signingRegion?: string;

  /**
   * The injectable SigV4-compatible signer class constructor. If not supplied,
   * regular SignatureV4 constructor will be used.
   *
   * @internal
   */
  signerConstructor?: new (options: SignatureV4Init & SignatureV4CryptoInit) => RequestSigner;
}

/**
 * @internal
 */
export interface AWSSDKSigV4PreviouslyResolved {
  credentialDefaultProvider: (input: any) => MemoizedProvider<AwsCredentialIdentity>;
  region: string | Provider<string>;
  sha256: ChecksumConstructor | HashConstructor;
  signingName?: string;
  regionInfoProvider?: RegionInfoProvider;
  defaultSigningName?: string;
  serviceId: string;
  useFipsEndpoint: Provider<boolean>;
  useDualstackEndpoint: Provider<boolean>;
}

/**
 * @internal
 */
export interface AWSSDKSigV4AuthResolvedConfig {
  /**
   * Resolved value for input config {@link AWSSDKSigV4AuthInputConfig.credentials}
   * This provider MAY memoize the loaded credentials for certain period.
   * See {@link MemoizedProvider} for more information.
   */
  credentials?: AwsCredentialIdentityProvider;
  /**
   * Resolved value for input config {@link AWSSDKSigV4AuthInputConfig.signer}
   */
  signer: (authScheme?: AuthScheme) => Promise<RequestSigner>;
  /**
   * Resolved value for input config {@link AWSSDKSigV4AuthInputConfig.signingEscapePath}
   */
  signingEscapePath: boolean;
  /**
   * Resolved value for input config {@link AWSSDKSigV4AuthInputConfig.systemClockOffset}
   */
  systemClockOffset: number;
}

/**
 * @internal
 */
export const resolveAWSSDKSigV4Config = <T>(
  input: T & AWSSDKSigV4AuthInputConfig & AWSSDKSigV4PreviouslyResolved
): T & AWSSDKSigV4AuthResolvedConfig & AWSSDKSigV4PreviouslyResolved => {
  const normalizedCreds = input.credentials
    ? memoizeIdentityProvider(input.credentials, isIdentityExpired, doesIdentityRequireRefresh)
    : input.credentialDefaultProvider(input as any);
  const {
    // Default for signingEscapePath
    signingEscapePath = true,
    // Default for systemClockOffset
    systemClockOffset = input.systemClockOffset || 0,
    // No default for sha256 since it is platform dependent
    sha256,
  } = input;
  let signer: (authScheme?: AuthScheme) => Promise<RequestSigner>;
  if (input.signer) {
    // if signer is supplied by user, normalize it to a function returning a promise for signer.
    signer = normalizeProvider(input.signer);
  } else if (input.regionInfoProvider) {
    // This branch is for endpoints V1.
    // construct a provider inferring signing from region.
    signer = () =>
      normalizeProvider(input.region)()
        .then(
          async (region) =>
            [
              (await input.regionInfoProvider!(region, {
                useFipsEndpoint: await input.useFipsEndpoint(),
                useDualstackEndpoint: await input.useDualstackEndpoint(),
              })) || {},
              region,
            ] as [RegionInfo, string]
        )
        .then(([regionInfo, region]) => {
          const { signingRegion, signingService } = regionInfo;
          // update client's singing region and signing service config if they are resolved.
          // signing region resolving order: user supplied signingRegion -> endpoints.json inferred region -> client region
          input.signingRegion = input.signingRegion || signingRegion || region;
          // signing name resolving order:
          // user supplied signingName -> endpoints.json inferred (credential scope -> model arnNamespace) -> model service id
          input.signingName = input.signingName || signingService || input.serviceId;

          const params: SignatureV4Init & SignatureV4CryptoInit = {
            ...input,
            credentials: normalizedCreds!,
            region: input.signingRegion,
            service: input.signingName,
            sha256,
            uriEscapePath: signingEscapePath,
          };
          const SignerCtor = input.signerConstructor || SignatureV4;
          return new SignerCtor(params);
        });
  } else {
    // This branch is for endpoints V2.
    // Handle endpoints v2 that resolved per-command
    // TODO: need total refactor for reference auth architecture.
    signer = async (authScheme?: AuthScheme) => {
      authScheme = Object.assign(
        {},
        {
          name: "sigv4",
          signingName: input.signingName || input.defaultSigningName!,
          signingRegion: await normalizeProvider(input.region)(),
          properties: {},
        },
        authScheme
      );

      const signingRegion = authScheme.signingRegion;
      const signingService = authScheme.signingName;
      // update client's singing region and signing service config if they are resolved.
      // signing region resolving order: user supplied signingRegion -> endpoints.json inferred region -> client region
      input.signingRegion = input.signingRegion || signingRegion;
      // signing name resolving order:
      // user supplied signingName -> endpoints.json inferred (credential scope -> model arnNamespace) -> model service id
      input.signingName = input.signingName || signingService || input.serviceId;

      const params: SignatureV4Init & SignatureV4CryptoInit = {
        ...input,
        credentials: normalizedCreds!,
        region: input.signingRegion,
        service: input.signingName,
        sha256,
        uriEscapePath: signingEscapePath,
      };

      const SignerCtor = input.signerConstructor || SignatureV4;
      return new SignerCtor(params);
    };
  }

  return {
    ...input,
    systemClockOffset,
    signingEscapePath,
    credentials: normalizedCreds,
    signer,
  };
};
