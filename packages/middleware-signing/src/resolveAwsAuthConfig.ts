import { normalizeProvider } from "@aws-sdk/util-middleware";

import { AwsAuthInputConfig, AwsAuthPreviouslyResolved, AwsAuthResolvedConfig } from "./configurations";
import { resolveAuthConfig } from "./utils/resolveAuthConfig";
import { getAwsAuthSigner } from "./utils/signer/getAwsAuthSigner";

export const resolveAwsAuthConfig = <T>(
  input: T & AwsAuthInputConfig & AwsAuthPreviouslyResolved
): T & AwsAuthResolvedConfig => {
  const authConfig = resolveAuthConfig(input);
  return {
    ...authConfig,
    signer: input.signer
      ? // if signer is supplied by user, normalize it to a function returning a promise for signer.
        normalizeProvider(input.signer)
      : getAwsAuthSigner(authConfig.credentials, input),
  };
};
