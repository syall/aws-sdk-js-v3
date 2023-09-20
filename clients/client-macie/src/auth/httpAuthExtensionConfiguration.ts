// smithy-typescript generated code
import { HttpAuthScheme } from "@smithy/experimental-identity-and-auth";
import { AwsCredentialIdentity, AwsCredentialIdentityProvider } from "@smithy/types";

import { MacieHttpAuthSchemeProvider } from "./httpAuthSchemeProvider";

/**
 * @internal
 */
export interface HttpAuthExtensionConfiguration {
  setHttpAuthScheme(httpAuthScheme: HttpAuthScheme): void;
  httpAuthSchemes(): HttpAuthScheme[];
  setHttpAuthSchemeProvider(httpAuthSchemeProvider: MacieHttpAuthSchemeProvider): void;
  httpAuthSchemeProvider(): MacieHttpAuthSchemeProvider;
  setCredentials(credentials: AwsCredentialIdentity | AwsCredentialIdentityProvider): void;
  credentials(): AwsCredentialIdentity | AwsCredentialIdentityProvider | undefined;
}

/**
 * @internal
 */
export type HttpAuthRuntimeConfig = Partial<{
  httpAuthSchemes: HttpAuthScheme[];
  httpAuthSchemeProvider: MacieHttpAuthSchemeProvider;
  credentials: AwsCredentialIdentity | AwsCredentialIdentityProvider;
}>;

/**
 * @internal
 */
export const getHttpAuthExtensionConfiguration = (
  runtimeConfig: HttpAuthRuntimeConfig
): HttpAuthExtensionConfiguration => {
  const _httpAuthSchemes = runtimeConfig.httpAuthSchemes!;
  let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider!;
  let _credentials = runtimeConfig.credentials;
  return {
    setHttpAuthScheme(httpAuthScheme: HttpAuthScheme): void {
      _httpAuthSchemes.push(httpAuthScheme);
    },
    httpAuthSchemes(): HttpAuthScheme[] {
      return _httpAuthSchemes;
    },
    setHttpAuthSchemeProvider(httpAuthSchemeProvider: MacieHttpAuthSchemeProvider): void {
      _httpAuthSchemeProvider = httpAuthSchemeProvider;
    },
    httpAuthSchemeProvider(): MacieHttpAuthSchemeProvider {
      return _httpAuthSchemeProvider;
    },
    setCredentials(credentials: AwsCredentialIdentity | AwsCredentialIdentityProvider): void {
      _credentials = credentials;
    },
    credentials(): AwsCredentialIdentity | AwsCredentialIdentityProvider | undefined {
      return _credentials;
    },
  };
};

/**
 * @internal
 */
export const resolveHttpAuthRuntimeConfig = (config: HttpAuthExtensionConfiguration): HttpAuthRuntimeConfig => {
  return {
    httpAuthSchemes: config.httpAuthSchemes(),
    httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
    credentials: config.credentials(),
  };
};
