// smithy-typescript generated code
import { HttpBearerAuthSigner, IdentityProviderConfig } from "@smithy/experimental-identity-and-auth";
import { NoOpLogger } from "@smithy/smithy-client";
import { parseUrl } from "@smithy/url-parser";
import { fromBase64, toBase64 } from "@smithy/util-base64";
import { fromUtf8, toUtf8 } from "@smithy/util-utf8";

import { defaultCodeCatalystHttpAuthSchemeProvider } from "./auth/httpAuthSchemeProvider";
import { CodeCatalystClientConfig } from "./CodeCatalystClient";
import { defaultEndpointResolver } from "./endpoint/endpointResolver";

/**
 * @internal
 */
export const getRuntimeConfig = (config: CodeCatalystClientConfig) => ({
  apiVersion: "2022-09-28",
  base64Decoder: config?.base64Decoder ?? fromBase64,
  base64Encoder: config?.base64Encoder ?? toBase64,
  disableHostPrefix: config?.disableHostPrefix ?? false,
  endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
  extensions: config?.extensions ?? [],
  httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultCodeCatalystHttpAuthSchemeProvider,
  httpAuthSchemes: config?.httpAuthSchemes ?? [
    {
      schemeId: "smithy.api#httpBearerAuth",
      identityProvider: (config: IdentityProviderConfig) => config.getIdentityProvider("smithy.api#httpBearerAuth"),
      signer: new HttpBearerAuthSigner(),
    },
  ],
  logger: config?.logger ?? new NoOpLogger(),
  serviceId: config?.serviceId ?? "CodeCatalyst",
  urlParser: config?.urlParser ?? parseUrl,
  utf8Decoder: config?.utf8Decoder ?? fromUtf8,
  utf8Encoder: config?.utf8Encoder ?? toUtf8,
});
