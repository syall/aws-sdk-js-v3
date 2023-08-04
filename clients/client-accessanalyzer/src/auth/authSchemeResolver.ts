// smithy-typescript generated code
import { expectString } from "@smithy/smithy-client";
import { AuthOption, AuthSchemeParameters, HandlerExecutionContext } from "@smithy/types";
import { normalizeProvider } from "@smithy/util-middleware";

import { AccessAnalyzerClientResolvedConfig } from "../AccessAnalyzerClient";

export interface AccessAnalyzerAuthSchemeParameters extends AuthSchemeParameters {
  operation?: string;
  region?: string;
}

export async function resolveAuthSchemeParameters(
  config: AccessAnalyzerClientResolvedConfig,
  context: HandlerExecutionContext
): Promise<AccessAnalyzerAuthSchemeParameters> {
  return {
    operation: context.commandName,
    region: await normalizeProvider(config.region)(),
  };
}

export function defaultAuthSchemeResolver(authParameters: AccessAnalyzerAuthSchemeParameters): AuthOption[] {
  const options: AuthOption[] = [];
  switch (authParameters.operation) {
    default: {
      options.push(get_aws_auth_sigv4AuthOption(authParameters));
    }
  }
  return options;
}

function get_aws_auth_sigv4AuthOption(authParameters: AccessAnalyzerAuthSchemeParameters): AuthOption {
  return {
    schemeId: "aws.auth#sigv4",
    signerProperties: {
      name: "access-analyzer",
      region: expectString(authParameters.region),
    },
  };
}
