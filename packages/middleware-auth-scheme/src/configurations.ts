import {
  SelectedAuthScheme,
  HandlerExecutionContext,
  AuthScheme,
  SMITHY_SDK_INTERNAL,
  AuthSchemeResolver,
  AuthSchemeParameters,
  AuthSchemeParametersResolver,
  IdentityProviderConfiguration,
} from "@smithy/types";

export interface AuthSchemeResolvedConfig { }

export interface AuthSchemeMiddlewareOptions {
  authSchemeResolver: AuthSchemeResolver;
  authSchemeParametersResolver: AuthSchemeParametersResolver<AuthSchemeParameters>
}

export interface AuthSchemeHandlerExecutionContext extends HandlerExecutionContext {
  clientName?: string;
  commandName?: string;
  [SMITHY_SDK_INTERNAL]?: {
    authSchemes?: AuthScheme[];
    authSchemeProvider?: AuthSchemeResolver;
    identityResolvers?: IdentityProviderConfiguration;
    selectedAuthScheme?: SelectedAuthScheme;
  }
}
