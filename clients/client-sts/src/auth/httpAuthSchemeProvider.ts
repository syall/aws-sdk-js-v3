// smithy-typescript generated code
import { doesIdentityRequireRefresh, isIdentityExpired, memoizeIdentityProvider } from "@smithy/core";
import {
  AwsCredentialIdentity,
  AwsCredentialIdentityProvider,
  HandlerExecutionContext,
  HttpAuthOption,
  HttpAuthScheme,
  HttpAuthSchemeParameters,
  HttpAuthSchemeParametersProvider,
  HttpAuthSchemeProvider,
} from "@smithy/types";
import { getSmithyContext, normalizeProvider } from "@smithy/util-middleware";

import { STSClient, STSClientConfig, STSClientResolvedConfig } from "../STSClient";

/**
 * @internal
 */
export interface STSHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}

/**
 * @internal
 */
export interface STSHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<
    STSClientResolvedConfig,
    HandlerExecutionContext,
    STSHttpAuthSchemeParameters,
    object
  > {}

/**
 * @internal
 */
export const defaultSTSHttpAuthSchemeParametersProvider = async (
  config: STSClientResolvedConfig,
  context: HandlerExecutionContext,
  input: object
): Promise<STSHttpAuthSchemeParameters> => {
  return {
    operation: getSmithyContext(context).operation as string,
    region:
      (await normalizeProvider(config.region)()) ||
      (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })(),
  };
};

function createAwsAuthSigv4HttpAuthOption(authParameters: STSHttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "sts",
      region: authParameters.region,
    },
    propertiesExtractor: (__config, context) => ({
      /**
       * @internal
       */
      identityProperties: {
        __config,
      },
    }),
  };
}

function createSmithyApiNoAuthHttpAuthOption(authParameters: STSHttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "smithy.api#noAuth",
  };
}

/**
 * @internal
 */
export interface STSHttpAuthSchemeProvider extends HttpAuthSchemeProvider<STSHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultSTSHttpAuthSchemeProvider: STSHttpAuthSchemeProvider = (authParameters) => {
  const options: HttpAuthOption[] = [];
  switch (authParameters.operation) {
    case "AssumeRoleWithSAML": {
      options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
      break;
    }
    case "AssumeRoleWithWebIdentity": {
      options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
      break;
    }
    default: {
      options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
    }
  }
  return options;
};

export interface StsAuthInputConfig {}

export interface StsAuthResolvedConfig {
  /**
   * Reference to STSClient class constructor.
   * @internal
   */
  stsClientCtor: new (config: STSClientConfig) => STSClient;
}

export const resolveStsAuthConfig = <T>(input: T): T & StsAuthResolvedConfig => ({
  ...input,
  stsClientCtor: STSClient,
});

/**
 * @internal
 */
export interface HttpAuthSchemeInputConfig {
  /**
   * experimentalIdentityAndAuth: Configuration of HttpAuthSchemes for a client which provides default identity providers and signers per auth scheme.
   * @internal
   */
  httpAuthSchemes?: HttpAuthScheme[];

  /**
   * experimentalIdentityAndAuth: Configuration of an HttpAuthSchemeProvider for a client which resolves which HttpAuthScheme to use.
   * @internal
   */
  httpAuthSchemeProvider?: STSHttpAuthSchemeProvider;

  /**
   * The credentials used to sign requests.
   */
  credentials?: AwsCredentialIdentity | AwsCredentialIdentityProvider;
}

/**
 * @internal
 */
export interface HttpAuthSchemeResolvedConfig {
  /**
   * experimentalIdentityAndAuth: Configuration of HttpAuthSchemes for a client which provides default identity providers and signers per auth scheme.
   * @internal
   */
  readonly httpAuthSchemes: HttpAuthScheme[];

  /**
   * experimentalIdentityAndAuth: Configuration of an HttpAuthSchemeProvider for a client which resolves which HttpAuthScheme to use.
   * @internal
   */
  readonly httpAuthSchemeProvider: STSHttpAuthSchemeProvider;

  /**
   * The credentials used to sign requests.
   */
  readonly credentials?: AwsCredentialIdentityProvider;
}

/**
 * @internal
 */
export const resolveHttpAuthSchemeConfig = <T>(
  config: T & HttpAuthSchemeInputConfig
): T & HttpAuthSchemeResolvedConfig => {
  const credentials = memoizeIdentityProvider(config.credentials, isIdentityExpired, doesIdentityRequireRefresh);
  return {
    ...config,
    credentials,
  } as T & HttpAuthSchemeResolvedConfig;
};
