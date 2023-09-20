// smithy-typescript generated code
import { IdentityProviderConfig, SigV4Signer } from "@smithy/experimental-identity-and-auth";
import { NoOpLogger } from "@smithy/smithy-client";
import { parseUrl } from "@smithy/url-parser";
import { fromBase64, toBase64 } from "@smithy/util-base64";
import { fromUtf8, toUtf8 } from "@smithy/util-utf8";

import { defaultAWSSecurityTokenServiceV20110615HttpAuthSchemeProvider } from "./auth/httpAuthSchemeProvider";
import { defaultEndpointResolver } from "./endpoint/endpointResolver";
import { STSClientConfig } from "./STSClient";

/**
 * @internal
 */
export const getRuntimeConfig = (config: STSClientConfig) => ({
  apiVersion: "2011-06-15",
  base64Decoder: config?.base64Decoder ?? fromBase64,
  base64Encoder: config?.base64Encoder ?? toBase64,
  disableHostPrefix: config?.disableHostPrefix ?? false,
  endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
  extensions: config?.extensions ?? [],
  httpAuthSchemeProvider:
    config?.httpAuthSchemeProvider ?? defaultAWSSecurityTokenServiceV20110615HttpAuthSchemeProvider,
  httpAuthSchemes: config?.httpAuthSchemes ?? [
    {
      schemeId: "aws.auth#sigv4",
      identityProvider: (config: IdentityProviderConfig) => config.getIdentityProvider("aws.auth#sigv4"),
      signer: new SigV4Signer(),
    },
  ],
  logger: config?.logger ?? new NoOpLogger(),
  serviceId: config?.serviceId ?? "STS",
  urlParser: config?.urlParser ?? parseUrl,
  utf8Decoder: config?.utf8Decoder ?? fromUtf8,
  utf8Encoder: config?.utf8Encoder ?? toUtf8,
});
