// smithy-typescript generated code
import {
  AWSSDKSigV4AuthInputConfig,
  AWSSDKSigV4AuthResolvedConfig,
  AWSSDKSigV4PreviouslyResolved,
  resolveAWSSDKSigV4Config,
} from "@aws-sdk/core";
import {
  HandlerExecutionContext,
  HttpAuthOption,
  HttpAuthScheme,
  HttpAuthSchemeParameters,
  HttpAuthSchemeParametersProvider,
  HttpAuthSchemeProvider,
} from "@smithy/types";
import { getSmithyContext, normalizeProvider } from "@smithy/util-middleware";

import { TranscribeStreamingClientConfig, TranscribeStreamingClientResolvedConfig } from "../TranscribeStreamingClient";

/**
 * @internal
 */
export interface TranscribeStreamingHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}

/**
 * @internal
 */
export interface TranscribeStreamingHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<
    TranscribeStreamingClientResolvedConfig,
    HandlerExecutionContext,
    TranscribeStreamingHttpAuthSchemeParameters,
    object
  > {}

/**
 * @internal
 */
export const defaultTranscribeStreamingHttpAuthSchemeParametersProvider = async (
  config: TranscribeStreamingClientResolvedConfig,
  context: HandlerExecutionContext,
  input: object
): Promise<TranscribeStreamingHttpAuthSchemeParameters> => {
  return {
    operation: getSmithyContext(context).operation as string,
    region:
      (await normalizeProvider(config.region)()) ||
      (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })(),
  };
};

function createAwsAuthSigv4HttpAuthOption(authParameters: TranscribeStreamingHttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "transcribe",
      region: authParameters.region,
    },
    propertiesExtractor: (config: TranscribeStreamingClientConfig, context) => ({
      /**
       * @internal
       */
      signingProperties: {
        config,
        context,
      },
    }),
  };
}

/**
 * @internal
 */
export interface TranscribeStreamingHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<TranscribeStreamingHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultTranscribeStreamingHttpAuthSchemeProvider: TranscribeStreamingHttpAuthSchemeProvider = (
  authParameters
) => {
  const options: HttpAuthOption[] = [];
  switch (authParameters.operation) {
    default: {
      options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
    }
  }
  return options;
};

/**
 * @internal
 */
export interface HttpAuthSchemeInputConfig extends AWSSDKSigV4AuthInputConfig {
  /**
   * experimentalIdentityAndAuth: Configuration of HttpAuthSchemes for a client which provides default identity providers and signers per auth scheme.
   * @internal
   */
  httpAuthSchemes?: HttpAuthScheme[];

  /**
   * experimentalIdentityAndAuth: Configuration of an HttpAuthSchemeProvider for a client which resolves which HttpAuthScheme to use.
   * @internal
   */
  httpAuthSchemeProvider?: TranscribeStreamingHttpAuthSchemeProvider;
}

/**
 * @internal
 */
export interface HttpAuthSchemeResolvedConfig extends AWSSDKSigV4AuthResolvedConfig {
  /**
   * experimentalIdentityAndAuth: Configuration of HttpAuthSchemes for a client which provides default identity providers and signers per auth scheme.
   * @internal
   */
  readonly httpAuthSchemes: HttpAuthScheme[];

  /**
   * experimentalIdentityAndAuth: Configuration of an HttpAuthSchemeProvider for a client which resolves which HttpAuthScheme to use.
   * @internal
   */
  readonly httpAuthSchemeProvider: TranscribeStreamingHttpAuthSchemeProvider;
}

/**
 * @internal
 */
export const resolveHttpAuthSchemeConfig = <T>(
  config: T & HttpAuthSchemeInputConfig & AWSSDKSigV4PreviouslyResolved
): T & HttpAuthSchemeResolvedConfig => {
  const config_0 = resolveAWSSDKSigV4Config(config);
  return {
    ...config_0,
  } as T & HttpAuthSchemeResolvedConfig;
};
