// smithy-typescript generated code
import { IdentityProviderConfig, SigV4Signer } from "@smithy/experimental-identity-and-auth";
import { NoOpLogger } from "@smithy/smithy-client";
import { parseUrl } from "@smithy/url-parser";
import { fromBase64, toBase64 } from "@smithy/util-base64";
import { fromUtf8, toUtf8 } from "@smithy/util-utf8";

import { defaultAWSEventsHttpAuthSchemeProvider } from "./auth/httpAuthSchemeProvider";
import { defaultEndpointResolver } from "./endpoint/endpointResolver";
import { EventBridgeClientConfig } from "./EventBridgeClient";

/**
 * @internal
 */
export const getRuntimeConfig = (config: EventBridgeClientConfig) => ({
  apiVersion: "2015-10-07",
  base64Decoder: config?.base64Decoder ?? fromBase64,
  base64Encoder: config?.base64Encoder ?? toBase64,
  disableHostPrefix: config?.disableHostPrefix ?? false,
  endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
  extensions: config?.extensions ?? [],
  httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultAWSEventsHttpAuthSchemeProvider,
  httpAuthSchemes: config?.httpAuthSchemes ?? [
    {
      schemeId: "aws.auth#sigv4",
      identityProvider: (config: IdentityProviderConfig) => config.getIdentityProvider("aws.auth#sigv4"),
      signer: new SigV4Signer(),
    },
  ],
  logger: config?.logger ?? new NoOpLogger(),
  serviceId: config?.serviceId ?? "EventBridge",
  urlParser: config?.urlParser ?? parseUrl,
  utf8Decoder: config?.utf8Decoder ?? fromUtf8,
  utf8Encoder: config?.utf8Encoder ?? toUtf8,
});
