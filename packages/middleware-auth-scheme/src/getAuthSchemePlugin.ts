import { Pluggable } from "@smithy/types";
import { authSchemeMiddleware, authSchemeMiddlewareOptions } from "./authSchemeMiddleware";
import { AuthSchemeMiddlewareOptions } from "./configurations";

export const getAuthSchemePlugin = (config: object, authSchemeResolverOptions: AuthSchemeMiddlewareOptions): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(authSchemeMiddleware(config, authSchemeResolverOptions), authSchemeMiddlewareOptions);
  },
});
