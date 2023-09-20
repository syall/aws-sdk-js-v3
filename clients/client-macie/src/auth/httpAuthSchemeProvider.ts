// smithy-typescript generated code
import {
  DefaultIdentityProviderConfig,
  doesIdentityRequireRefresh,
  HttpAuthOption,
  HttpAuthSchemeParameters,
  HttpAuthSchemeParametersProvider,
  HttpAuthSchemeProvider,
  IdentityProviderConfig,
  isIdentityExpired,
  memoizeIdentityProvider,
} from "@smithy/experimental-identity-and-auth";
import { AwsCredentialIdentity, AwsCredentialIdentityProvider, Provider as __Provider } from "@smithy/types";
import { getSmithyContext, normalizeProvider } from "@smithy/util-middleware";

import { MacieClientResolvedConfig } from "../MacieClient";

/**
 * @internal
 */
export interface MacieHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}

/**
 * @internal
 */
export interface MacieHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<MacieClientResolvedConfig, MacieHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultMacieHttpAuthSchemeParametersProvider: MacieHttpAuthSchemeParametersProvider = async (
  config,
  context,
  input
) => {
  return {
    operation: getSmithyContext(context).operation as string,
    region:
      (await normalizeProvider(config.region)()) ||
      (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })(),
  };
};

function createAwsAuthSigv4HttpAuthOption(authParameters: MacieHttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "macie",
      region: authParameters.region,
    },
  };
}

/**
 * @internal
 */
export interface MacieHttpAuthSchemeProvider extends HttpAuthSchemeProvider<MacieHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultMacieHttpAuthSchemeProvider: MacieHttpAuthSchemeProvider = (authParameters) => {
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
export interface HttpAuthSchemeInputConfig {
  /**
   * The credentials used to sign requests.
   */
  credentials?: AwsCredentialIdentity | AwsCredentialIdentityProvider;
  /**
   * The AWS region to which this client will send requests.
   */
  region?: string | __Provider<string>;
}

/**
 * @internal
 */
export interface HttpAuthSchemeResolvedConfig {
  /**
   * The credentials used to sign requests.
   */
  readonly credentials?: AwsCredentialIdentityProvider;
  /**
   * The AWS region to which this client will send requests.
   */
  readonly region?: __Provider<string>;
  /**
   * experimentalIdentityAndAuth: provides parameters for HttpAuthSchemeProvider.
   * @internal
   */
  readonly httpAuthSchemeParametersProvider: MacieHttpAuthSchemeParametersProvider;
  /**
   * experimentalIdentityAndAuth: abstraction around identity configuration fields
   * @internal
   */
  readonly identityProviderConfig: IdentityProviderConfig;
}

/**
 * @internal
 */
export const resolveHttpAuthSchemeConfig = (config: HttpAuthSchemeInputConfig): HttpAuthSchemeResolvedConfig => {
  const credentials = memoizeIdentityProvider(config.credentials, isIdentityExpired, doesIdentityRequireRefresh);
  const region = config.region ? normalizeProvider(config.region) : undefined;
  return {
    ...config,
    credentials,
    region,
    httpAuthSchemeParametersProvider: defaultMacieHttpAuthSchemeParametersProvider,
    identityProviderConfig: new DefaultIdentityProviderConfig({
      "aws.auth#sigv4": credentials,
    }),
  };
};
