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

import { EventBridgeClientResolvedConfig } from "../EventBridgeClient";

/**
 * @internal
 */
export interface EventBridgeHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}

/**
 * @internal
 */
export interface EventBridgeHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<EventBridgeClientResolvedConfig, EventBridgeHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultEventBridgeHttpAuthSchemeParametersProvider: EventBridgeHttpAuthSchemeParametersProvider = async (
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

function createAwsAuthSigv4HttpAuthOption(authParameters: EventBridgeHttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "events",
      region: authParameters.region,
    },
  };
}

/**
 * @internal
 */
export interface EventBridgeHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<EventBridgeHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultEventBridgeHttpAuthSchemeProvider: EventBridgeHttpAuthSchemeProvider = (authParameters) => {
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
  readonly httpAuthSchemeParametersProvider: EventBridgeHttpAuthSchemeParametersProvider;
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
    httpAuthSchemeParametersProvider: defaultEventBridgeHttpAuthSchemeParametersProvider,
    identityProviderConfig: new DefaultIdentityProviderConfig({
      "aws.auth#sigv4": credentials,
    }),
  };
};
