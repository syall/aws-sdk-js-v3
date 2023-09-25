// smithy-typescript generated code
import {
  createEndpointRuleSetHttpAuthSchemeParametersProvider,
  createEndpointRuleSetHttpAuthSchemeProvider,
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

import { EndpointParameters } from "../endpoint/EndpointParameters";
import { defaultEndpointResolver } from "../endpoint/endpointResolver";
import { S3ClientResolvedConfig } from "../S3Client";

/**
 * @internal
 */
export interface S3HttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}

/**
 * @internal
 */
export interface S3HttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<S3ClientResolvedConfig, S3HttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultS3HttpAuthSchemeParametersProvider: S3HttpAuthSchemeParametersProvider = async (
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

function createAwsAuthSigv4HttpAuthOption(authParameters: S3HttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "s3",
      region: authParameters.region,
    },
  };
}

function createAwsAuthSigv4aHttpAuthOption(authParameters: S3HttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4a",
    signingProperties: {
      name: "s3",
      region: authParameters.region,
    },
  };
}

/**
 * @internal
 */
export interface S3HttpAuthSchemeProvider extends HttpAuthSchemeProvider<S3HttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultS3HttpAuthSchemeProvider: S3HttpAuthSchemeProvider = (authParameters) => {
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
  readonly httpAuthSchemeParametersProvider: S3HttpAuthSchemeParametersProvider;
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
    httpAuthSchemeParametersProvider: defaultEndpointRuleSetHttpAuthSchemeParametersProvider,
    identityProviderConfig: new DefaultIdentityProviderConfig({
      "aws.auth#sigv4": credentials,
    }),
  };
};

/**
 * @internal
 */
export interface S3EndpointRuleSetHttpAuthSchemeParameters extends EndpointParameters, S3HttpAuthSchemeParameters {}

/**
 * @internal
 */
export interface S3EndpointRuleSetHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<S3ClientResolvedConfig, S3EndpointRuleSetHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultEndpointRuleSetHttpAuthSchemeParametersProvider: S3EndpointRuleSetHttpAuthSchemeParametersProvider =
  createEndpointRuleSetHttpAuthSchemeParametersProvider(defaultS3HttpAuthSchemeParametersProvider);

/**
 * @internal
 */
export interface S3EndpointRuleSetHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<S3EndpointRuleSetHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultEndpointRuleSetHttpAuthSchemeProvider: S3EndpointRuleSetHttpAuthSchemeProvider =
  createEndpointRuleSetHttpAuthSchemeProvider(defaultEndpointResolver, defaultS3HttpAuthSchemeProvider);
