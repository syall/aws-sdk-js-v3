import {
  AuthScheme,
  EndpointV2,
  HandlerExecutionContext as SmithyHandlerExecutionContext,
  HttpAuthDefinition,
  UserAgent
} from "@smithy/types";

export interface HandlerExecutionContext extends SmithyHandlerExecutionContext {
  /**
   * @deprecated
   * Additional user agent that inferred by middleware. It can be used to save
   * the internal user agent sections without overriding the `customUserAgent`
   * config in clients.
   */
  userAgent?: UserAgent;

  /**
   * @deprecated
   * Resolved by the endpointMiddleware function of `@smithy/middleware-endpoint`
   * in the serialization stage.
   */
  endpointV2?: EndpointV2;

  /**
   * @deprecated
   * Set at the same time as endpointV2.
   */
  authSchemes?: AuthScheme[];

  /**
   * @deprecated
   * The current auth configuration that has been set by any auth middleware and
   * that will prevent from being set more than once.
   */
  currentAuthConfig?: HttpAuthDefinition;

  /**
   * @deprecated
   * Used by DynamoDbDocumentClient.
   */
  dynamoDbDocumentClientOptions?: Partial<{
    overrideInputFilterSensitiveLog(...args: any[]): string | void;
    overrideOutputFilterSensitiveLog(...args: any[]): string | void;
  }>;

  /**
   * @deprecated
   * Signing region resolved if {@link authSchemes} is defined.
   */
  signing_region?: string;

  /**
   * @deprecated
   * Signing service resolved if {@link authSchemes} is defined.
   */
  signing_service?: string;
}

export {
  AbsoluteLocation,
  BuildHandler,
  BuildHandlerArguments,
  BuildHandlerOptions,
  BuildHandlerOutput,
  BuildMiddleware,
  DeserializeHandler,
  DeserializeHandlerArguments,
  DeserializeHandlerOptions,
  DeserializeHandlerOutput,
  DeserializeMiddleware,
  FinalizeHandler,
  FinalizeHandlerArguments,
  FinalizeHandlerOutput,
  FinalizeRequestHandlerOptions,
  FinalizeRequestMiddleware,
  Handler,
  HandlerOptions,
  InitializeHandler,
  InitializeHandlerArguments,
  InitializeHandlerOptions,
  InitializeHandlerOutput,
  InitializeMiddleware,
  MiddlewareStack,
  MiddlewareType,
  Pluggable,
  Priority,
  Relation,
  RelativeLocation,
  RelativeMiddlewareOptions,
  SerializeHandler,
  SerializeHandlerArguments,
  SerializeHandlerOptions,
  SerializeHandlerOutput,
  SerializeMiddleware,
  Step,
  Terminalware,
} from "@smithy/types";
