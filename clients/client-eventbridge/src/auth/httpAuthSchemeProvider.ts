// smithy-typescript generated code
import {
  AWSSDKSigV4AuthInputConfig,
  AWSSDKSigV4AuthResolvedConfig,
  AWSSDKSigV4PreviouslyResolved,
  resolveAWSSDKSigV4Config,
} from "@aws-sdk/core";
import { EndpointParameterInstructions, resolveParams } from "@smithy/middleware-endpoint";
import {
  EndpointV2,
  HandlerExecutionContext,
  HttpAuthOption,
  HttpAuthScheme,
  HttpAuthSchemeId,
  HttpAuthSchemeParameters,
  HttpAuthSchemeParametersProvider,
  HttpAuthSchemeProvider,
  Logger,
} from "@smithy/types";
import { getSmithyContext, normalizeProvider } from "@smithy/util-middleware";

import { EndpointParameters } from "../endpoint/EndpointParameters";
import { defaultEndpointResolver } from "../endpoint/endpointResolver";
import { EventBridgeClientConfig, EventBridgeClientResolvedConfig } from "../EventBridgeClient";

/**
 * @internal
 */
interface _EventBridgeHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}

/**
 * @internal
 */
export interface EventBridgeHttpAuthSchemeParameters extends _EventBridgeHttpAuthSchemeParameters, EndpointParameters {
  region?: string;
}

/**
 * @internal
 */
export interface EventBridgeHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<
    EventBridgeClientResolvedConfig,
    HandlerExecutionContext,
    EventBridgeHttpAuthSchemeParameters,
    object
  > {}

/**
 * @internal
 */
interface EndpointRuleSetSmithyContext {
  endpointRuleSet?: {
    getEndpointParameterInstructions?: () => EndpointParameterInstructions;
  };
}
/**
 * @internal
 */
interface EndpointRuleSetHttpAuthSchemeParametersProvider<
  TConfig extends object,
  TContext extends HandlerExecutionContext,
  TParameters extends HttpAuthSchemeParameters & EndpointParameters,
  TInput extends object
> extends HttpAuthSchemeParametersProvider<TConfig, TContext, TParameters, TInput> {}
/**
 * @internal
 */
const createEndpointRuleSetHttpAuthSchemeParametersProvider =
  <
    TConfig extends object,
    TContext extends HandlerExecutionContext,
    THttpAuthSchemeParameters extends HttpAuthSchemeParameters,
    TEndpointParameters extends EndpointParameters,
    TParameters extends THttpAuthSchemeParameters & TEndpointParameters,
    TInput extends object
  >(
    defaultHttpAuthSchemeParametersProvider: HttpAuthSchemeParametersProvider<
      TConfig,
      TContext,
      THttpAuthSchemeParameters,
      TInput
    >
  ): EndpointRuleSetHttpAuthSchemeParametersProvider<
    TConfig,
    TContext,
    THttpAuthSchemeParameters & TEndpointParameters,
    TInput
  > =>
  async (config: TConfig, context: TContext, input: TInput): Promise<TParameters> => {
    if (!input) {
      throw new Error(`Could not find \`input\` for \`defaultEndpointRuleSetHttpAuthSchemeParametersProvider\``);
    }
    const defaultParameters = await defaultHttpAuthSchemeParametersProvider(config, context, input);
    const instructionsFn = (getSmithyContext(context) as EndpointRuleSetSmithyContext)?.endpointRuleSet
      ?.getEndpointParameterInstructions;
    if (!instructionsFn) {
      throw new Error(`getEndpointParameterInstructions() is not defined on \`${context.commandName!}\``);
    }
    const endpointParameters = await resolveParams(
      input as Record<string, unknown>,
      { getEndpointParameterInstructions: instructionsFn! },
      config as Record<string, unknown>
    );
    return Object.assign(defaultParameters, endpointParameters) as TParameters;
  };
/**
 * @internal
 */
const _defaultEventBridgeHttpAuthSchemeParametersProvider = async (
  config: EventBridgeClientResolvedConfig,
  context: HandlerExecutionContext,
  input: object
): Promise<_EventBridgeHttpAuthSchemeParameters> => {
  return {
    operation: getSmithyContext(context).operation as string,
    region:
      (await normalizeProvider(config.region)()) ||
      (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })(),
  };
};
/**
 * @internal
 */
export const defaultEventBridgeHttpAuthSchemeParametersProvider: EventBridgeHttpAuthSchemeParametersProvider =
  createEndpointRuleSetHttpAuthSchemeParametersProvider(_defaultEventBridgeHttpAuthSchemeParametersProvider);

function createAwsAuthSigv4HttpAuthOption(authParameters: EventBridgeHttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "events",
      region: authParameters.region,
    },
    propertiesExtractor: (config: EventBridgeClientConfig, context) => ({
      /**
       * @internal
       */
      signingProperties: {
        config,
        context,
      },
    }),
  };
}

function createAwsAuthSigv4aHttpAuthOption(authParameters: EventBridgeHttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4a",
    signingProperties: {
      name: "events",
      region: authParameters.region,
    },
    propertiesExtractor: (config: EventBridgeClientConfig, context) => ({
      /**
       * @internal
       */
      signingProperties: {
        config,
        context,
      },
    }),
  };
}

/**
 * @internal
 */
interface _EventBridgeHttpAuthSchemeProvider extends HttpAuthSchemeProvider<EventBridgeHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export interface EventBridgeHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<EventBridgeHttpAuthSchemeParameters> {}

/**
 * @internal
 */
interface EndpointRuleSetHttpAuthSchemeProvider<
  EndpointParametersT extends EndpointParameters,
  HttpAuthSchemeParametersT extends HttpAuthSchemeParameters
> extends HttpAuthSchemeProvider<EndpointParametersT & HttpAuthSchemeParametersT> {}
/**
 * @internal
 */
interface DefaultEndpointResolver<EndpointParametersT extends EndpointParameters> {
  (params: EndpointParametersT, context?: { logger?: Logger }): EndpointV2;
}
/**
 * @internal
 */
const createEndpointRuleSetHttpAuthSchemeProvider = <
  EndpointParametersT extends EndpointParameters,
  HttpAuthSchemeParametersT extends HttpAuthSchemeParameters
>(
  defaultEndpointResolver: DefaultEndpointResolver<EndpointParametersT>,
  defaultHttpAuthSchemeResolver: HttpAuthSchemeProvider<HttpAuthSchemeParametersT>,
  createHttpAuthOptionFunctions: Record<
    HttpAuthSchemeId,
    (authParameters: EndpointParametersT & HttpAuthSchemeParametersT) => HttpAuthOption
  >
): EndpointRuleSetHttpAuthSchemeProvider<EndpointParametersT, HttpAuthSchemeParametersT> => {
  const endpointRuleSetHttpAuthSchemeProvider: EndpointRuleSetHttpAuthSchemeProvider<
    EndpointParametersT,
    HttpAuthSchemeParametersT
  > = (authParameters) => {
    const endpoint: EndpointV2 = defaultEndpointResolver(authParameters);
    const authSchemes = endpoint.properties?.authSchemes;
    if (!authSchemes) {
      return defaultHttpAuthSchemeResolver(authParameters);
    }
    const options: HttpAuthOption[] = [];
    for (const scheme of authSchemes) {
      const { name: resolvedName, properties = {}, ...rest } = scheme;
      const name = resolvedName.toLowerCase();
      if (resolvedName !== name) {
        console.warn(`HttpAuthScheme has been normalized with lowercasing: \`${resolvedName}\` to \`${name}\``);
      }
      let schemeId;
      if (name === "sigv4a" || name === "sigv4-s3express") {
        schemeId = "aws.auth#sigv4a";
      } else if (name.startsWith("sigv4")) {
        schemeId = "aws.auth#sigv4";
      } else {
        throw new Error(`Unknown HttpAuthScheme found in \`@smithy.rules#endpointRuleSet\`: \`${name}\``);
      }
      const createOption = createHttpAuthOptionFunctions[schemeId];
      if (!createOption) {
        throw new Error(`Could not find HttpAuthOption create function for \`${schemeId}\``);
      }
      const option = createOption(authParameters);
      option.schemeId = schemeId;
      option.signingProperties = { ...(option.signingProperties || {}), ...rest, ...properties };
      options.push(option);
    }
    return options;
  };

  return endpointRuleSetHttpAuthSchemeProvider;
};
/**
 * @internal
 */
const _defaultEventBridgeHttpAuthSchemeProvider: _EventBridgeHttpAuthSchemeProvider = (authParameters) => {
  const options: HttpAuthOption[] = [];
  switch (authParameters.operation) {
    default: {
      options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
      options.push(createAwsAuthSigv4aHttpAuthOption(authParameters));
    }
  }
  return options;
};
/**
 * @internal
 */
export const defaultEventBridgeHttpAuthSchemeProvider: EventBridgeHttpAuthSchemeProvider =
  createEndpointRuleSetHttpAuthSchemeProvider(defaultEndpointResolver, _defaultEventBridgeHttpAuthSchemeProvider, {
    "aws.auth#sigv4": createAwsAuthSigv4HttpAuthOption,
    "aws.auth#sigv4a": createAwsAuthSigv4aHttpAuthOption,
  });

/**
 * @internal
 */
export interface HttpAuthSchemeInputConfig extends AWSSDKSigV4AuthInputConfig {
  /**
   * experimentalIdentityAndAuth: Configuration of HttpAuthSchemes for a client which provides default identity providers and signers per auth scheme.
   * @internal
   */
  httpAuthSchemes?: HttpAuthScheme[];

  /**
   * experimentalIdentityAndAuth: Configuration of an HttpAuthSchemeProvider for a client which resolves which HttpAuthScheme to use.
   * @internal
   */
  httpAuthSchemeProvider?: EventBridgeHttpAuthSchemeProvider;
}

/**
 * @internal
 */
export interface HttpAuthSchemeResolvedConfig extends AWSSDKSigV4AuthResolvedConfig {
  /**
   * experimentalIdentityAndAuth: Configuration of HttpAuthSchemes for a client which provides default identity providers and signers per auth scheme.
   * @internal
   */
  readonly httpAuthSchemes: HttpAuthScheme[];

  /**
   * experimentalIdentityAndAuth: Configuration of an HttpAuthSchemeProvider for a client which resolves which HttpAuthScheme to use.
   * @internal
   */
  readonly httpAuthSchemeProvider: EventBridgeHttpAuthSchemeProvider;
}

/**
 * @internal
 */
export const resolveHttpAuthSchemeConfig = <T>(
  config: T & HttpAuthSchemeInputConfig & AWSSDKSigV4PreviouslyResolved
): T & HttpAuthSchemeResolvedConfig => {
  const config_0 = resolveAWSSDKSigV4Config(config);
  return {
    ...config_0,
  } as T & HttpAuthSchemeResolvedConfig;
};
