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
  TokenIdentity,
  TokenIdentityProvider,
} from "@smithy/experimental-identity-and-auth";
import { getSmithyContext, normalizeProvider } from "@smithy/util-middleware";

import { CodeCatalystClientResolvedConfig } from "../CodeCatalystClient";

/**
 * @internal
 */
export interface CodeCatalystHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}

/**
 * @internal
 */
export interface CodeCatalystHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<CodeCatalystClientResolvedConfig, CodeCatalystHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultCodeCatalystHttpAuthSchemeParametersProvider: CodeCatalystHttpAuthSchemeParametersProvider = async (
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

function createSmithyApiHttpBearerAuthHttpAuthOption(
  authParameters: CodeCatalystHttpAuthSchemeParameters
): HttpAuthOption {
  return {
    schemeId: "smithy.api#httpBearerAuth",
  };
}

/**
 * @internal
 */
export interface CodeCatalystHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<CodeCatalystHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultCodeCatalystHttpAuthSchemeProvider: CodeCatalystHttpAuthSchemeProvider = (authParameters) => {
  const options: HttpAuthOption[] = [];
  switch (authParameters.operation) {
    default: {
      options.push(createSmithyApiHttpBearerAuthHttpAuthOption(authParameters));
    }
  }
  return options;
};

/**
 * @internal
 */
export interface HttpAuthSchemeInputConfig {
  /**
   * The token used to authenticate requests.
   */
  token?: TokenIdentity | TokenIdentityProvider;
}

/**
 * @internal
 */
export interface HttpAuthSchemeResolvedConfig {
  /**
   * The token used to authenticate requests.
   */
  readonly token?: TokenIdentityProvider;
  /**
   * experimentalIdentityAndAuth: provides parameters for HttpAuthSchemeProvider.
   * @internal
   */
  readonly httpAuthSchemeParametersProvider: CodeCatalystHttpAuthSchemeParametersProvider;
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
  const token = memoizeIdentityProvider(config.token, isIdentityExpired, doesIdentityRequireRefresh);
  return {
    ...config,
    token,
    httpAuthSchemeParametersProvider: defaultCodeCatalystHttpAuthSchemeParametersProvider,
    identityProviderConfig: new DefaultIdentityProviderConfig({
      "smithy.api#httpBearerAuth": token,
    }),
  };
};
