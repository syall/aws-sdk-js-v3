import { endpointMiddlewareOptions } from "@smithy/middleware-endpoint";
import { HttpRequest } from "@smithy/protocol-http";
import {
  AuthOption,
  AuthScheme,
  Identity,
  IdentityProvider,
  IdentityProviderConfiguration,
  RelativeMiddlewareOptions,
  SelectedAuthScheme,
  SerializeHandler,
  SerializeHandlerArguments,
  SerializeHandlerOptions,
  SerializeHandlerOutput,
  SerializeMiddleware,
  SMITHY_SDK_INTERNAL,
} from "@smithy/types";
import {
  AuthSchemeHandlerExecutionContext,
  AuthSchemeMiddlewareOptions,
  AuthSchemeResolvedConfig,
} from "./configurations";

export const AUTH_SCHEME_MIDDLEWARE_NAME = "authSchemeMiddleware";

export const authSchemeMiddlewareOptions: SerializeHandlerOptions & RelativeMiddlewareOptions = {
  step: "serialize",
  name: AUTH_SCHEME_MIDDLEWARE_NAME,
  override: true,
  relation: "before",
  toMiddleware: endpointMiddlewareOptions.name!,
};

export const authSchemeMiddleware =
  <Input extends object, Output extends object>(
    config: AuthSchemeResolvedConfig,
    options: AuthSchemeMiddlewareOptions
  ): SerializeMiddleware<Input, Output> =>
    (next: SerializeHandler<Input, Output>, context: AuthSchemeHandlerExecutionContext): SerializeHandler<Input, Output> =>
      async (args: SerializeHandlerArguments<Input>): Promise<SerializeHandlerOutput<Output>> => {
        if (!HttpRequest.isInstance(args.request)) {
          return next(args);
        }

        if (!context[SMITHY_SDK_INTERNAL]) {
          context[SMITHY_SDK_INTERNAL] = {};
        }

        if (context[SMITHY_SDK_INTERNAL].selectedAuthScheme) {
          return next(args);
        }

        const authSchemeParameters = await options.authSchemeParametersResolver(config, context);
        const authOptions = options.authSchemeResolver(authSchemeParameters);
        context[SMITHY_SDK_INTERNAL].selectedAuthScheme = await selectAuthScheme(authOptions, context);

        return next(args);
      };

export async function selectAuthScheme(
  authOptions: AuthOption[],
  context: AuthSchemeHandlerExecutionContext,
): Promise<SelectedAuthScheme> {
  const failureReasons: string[] = [];
  for (const authOption of authOptions) {
    const authScheme = context[SMITHY_SDK_INTERNAL]!.authSchemes!
      .find(auth => auth.schemeId === authOption.schemeId)!;
    const selectedAuthScheme = await tryLoadAuthScheme(
      authOption,
      authScheme,
      context[SMITHY_SDK_INTERNAL]!.identityResolvers!,
      failureReasons
    );
    if (selectedAuthScheme) {
      failureReasons.forEach(console.log);
      console.log(`Auth scheme ${authOption.schemeId} will be used.`);
      return selectedAuthScheme;
    }
  }
  throw new Error(failureReasons.join(','));
};

export async function tryLoadAuthScheme(
  authOption: AuthOption,
  authScheme: AuthScheme,
  identityProviders: IdentityProviderConfiguration,
  failureReasons: string[]
): Promise<SelectedAuthScheme | null> {
  if (!authScheme) {
    failureReasons.push(`Auth scheme ${authOption.schemeId} was not enabled for this request.`);
    return null;
  }
  const identityProvider: IdentityProvider<Identity> = authScheme.identityProvider.getIdentityProvider(authOption.schemeId);
  if (!identityProvider) {
    failureReasons.push(`Auth scheme ${authOption.schemeId} did not have an identity resolver configured.`);
    return null;
  }
  const identity = await identityProvider(authOption.identityProperties);
  return {
    identity,
    signer: authScheme.signer,
    authOption,
  };
};
