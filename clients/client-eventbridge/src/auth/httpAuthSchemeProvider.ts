// smithy-typescript generated code
import {
  createEndpointRuleSetHttpAuthSchemeProvider,
  DefaultIdentityProviderConfig,
  doesIdentityRequireRefresh,
  HttpAuthOption,
  HttpAuthSchemeParameters,
  HttpAuthSchemeParametersProvider,
  HttpAuthSchemeProvider,
  IdentityProviderConfig,
  isIdentityExpired,
  memoizeIdentityProvider,
} from "@smithy/experimental-identity-and-auth";
import { EndpointParameterInstructions, resolveParams } from "@smithy/middleware-endpoint";
import { AwsCredentialIdentity, AwsCredentialIdentityProvider, Provider as __Provider } from "@smithy/types";
import { getSmithyContext, normalizeProvider } from "@smithy/util-middleware";

import { ActivateEventSourceCommand } from "../commands/ActivateEventSourceCommand";
import { CancelReplayCommand } from "../commands/CancelReplayCommand";
import { CreateApiDestinationCommand } from "../commands/CreateApiDestinationCommand";
import { CreateArchiveCommand } from "../commands/CreateArchiveCommand";
import { CreateConnectionCommand } from "../commands/CreateConnectionCommand";
import { CreateEndpointCommand } from "../commands/CreateEndpointCommand";
import { CreateEventBusCommand } from "../commands/CreateEventBusCommand";
import { CreatePartnerEventSourceCommand } from "../commands/CreatePartnerEventSourceCommand";
import { DeactivateEventSourceCommand } from "../commands/DeactivateEventSourceCommand";
import { DeauthorizeConnectionCommand } from "../commands/DeauthorizeConnectionCommand";
import { DeleteApiDestinationCommand } from "../commands/DeleteApiDestinationCommand";
import { DeleteArchiveCommand } from "../commands/DeleteArchiveCommand";
import { DeleteConnectionCommand } from "../commands/DeleteConnectionCommand";
import { DeleteEndpointCommand } from "../commands/DeleteEndpointCommand";
import { DeleteEventBusCommand } from "../commands/DeleteEventBusCommand";
import { DeletePartnerEventSourceCommand } from "../commands/DeletePartnerEventSourceCommand";
import { DeleteRuleCommand } from "../commands/DeleteRuleCommand";
import { DescribeApiDestinationCommand } from "../commands/DescribeApiDestinationCommand";
import { DescribeArchiveCommand } from "../commands/DescribeArchiveCommand";
import { DescribeConnectionCommand } from "../commands/DescribeConnectionCommand";
import { DescribeEndpointCommand } from "../commands/DescribeEndpointCommand";
import { DescribeEventBusCommand } from "../commands/DescribeEventBusCommand";
import { DescribeEventSourceCommand } from "../commands/DescribeEventSourceCommand";
import { DescribePartnerEventSourceCommand } from "../commands/DescribePartnerEventSourceCommand";
import { DescribeReplayCommand } from "../commands/DescribeReplayCommand";
import { DescribeRuleCommand } from "../commands/DescribeRuleCommand";
import { DisableRuleCommand } from "../commands/DisableRuleCommand";
import { EnableRuleCommand } from "../commands/EnableRuleCommand";
import { ListApiDestinationsCommand } from "../commands/ListApiDestinationsCommand";
import { ListArchivesCommand } from "../commands/ListArchivesCommand";
import { ListConnectionsCommand } from "../commands/ListConnectionsCommand";
import { ListEndpointsCommand } from "../commands/ListEndpointsCommand";
import { ListEventBusesCommand } from "../commands/ListEventBusesCommand";
import { ListEventSourcesCommand } from "../commands/ListEventSourcesCommand";
import { ListPartnerEventSourceAccountsCommand } from "../commands/ListPartnerEventSourceAccountsCommand";
import { ListPartnerEventSourcesCommand } from "../commands/ListPartnerEventSourcesCommand";
import { ListReplaysCommand } from "../commands/ListReplaysCommand";
import { ListRuleNamesByTargetCommand } from "../commands/ListRuleNamesByTargetCommand";
import { ListRulesCommand } from "../commands/ListRulesCommand";
import { ListTagsForResourceCommand } from "../commands/ListTagsForResourceCommand";
import { ListTargetsByRuleCommand } from "../commands/ListTargetsByRuleCommand";
import { PutEventsCommand } from "../commands/PutEventsCommand";
import { PutPartnerEventsCommand } from "../commands/PutPartnerEventsCommand";
import { PutPermissionCommand } from "../commands/PutPermissionCommand";
import { PutRuleCommand } from "../commands/PutRuleCommand";
import { PutTargetsCommand } from "../commands/PutTargetsCommand";
import { RemovePermissionCommand } from "../commands/RemovePermissionCommand";
import { RemoveTargetsCommand } from "../commands/RemoveTargetsCommand";
import { StartReplayCommand } from "../commands/StartReplayCommand";
import { TagResourceCommand } from "../commands/TagResourceCommand";
import { TestEventPatternCommand } from "../commands/TestEventPatternCommand";
import { UntagResourceCommand } from "../commands/UntagResourceCommand";
import { UpdateApiDestinationCommand } from "../commands/UpdateApiDestinationCommand";
import { UpdateArchiveCommand } from "../commands/UpdateArchiveCommand";
import { UpdateConnectionCommand } from "../commands/UpdateConnectionCommand";
import { UpdateEndpointCommand } from "../commands/UpdateEndpointCommand";
import { EndpointParameters } from "../endpoint/EndpointParameters";
import { defaultEndpointResolver } from "../endpoint/endpointResolver";
import { EventBridgeClientResolvedConfig } from "../EventBridgeClient";

/**
 * @internal
 */
export interface EventBridgeHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}

/**
 * @internal
 */
export interface EventBridgeHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<EventBridgeClientResolvedConfig, EventBridgeHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultEventBridgeHttpAuthSchemeParametersProvider: EventBridgeHttpAuthSchemeParametersProvider = async (
  config,
  context,
  input
) => {
  return {
    operation: getSmithyContext(context).operation as string,
    region:
      (await normalizeProvider(config.region)()) ||
      (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })(),
  };
};

function createAwsAuthSigv4HttpAuthOption(authParameters: EventBridgeHttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "events",
      region: authParameters.region,
    },
  };
}

function createAwsAuthSigv4aHttpAuthOption(authParameters: EventBridgeHttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4a",
    signingProperties: {
      name: "events",
      region: authParameters.region,
    },
  };
}

/**
 * @internal
 */
export interface EventBridgeHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<EventBridgeHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultEventBridgeHttpAuthSchemeProvider: EventBridgeHttpAuthSchemeProvider = (authParameters) => {
  const options: HttpAuthOption[] = [];
  switch (authParameters.operation) {
    default: {
      options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
    }
  }
  return options;
};

/**
 * @internal
 */
export interface HttpAuthSchemeInputConfig {
  /**
   * The credentials used to sign requests.
   */
  credentials?: AwsCredentialIdentity | AwsCredentialIdentityProvider;
  /**
   * The AWS region to which this client will send requests.
   */
  region?: string | __Provider<string>;
}

/**
 * @internal
 */
export interface HttpAuthSchemeResolvedConfig {
  /**
   * The credentials used to sign requests.
   */
  readonly credentials?: AwsCredentialIdentityProvider;
  /**
   * The AWS region to which this client will send requests.
   */
  readonly region?: __Provider<string>;
  /**
   * experimentalIdentityAndAuth: provides parameters for HttpAuthSchemeProvider.
   * @internal
   */
  readonly httpAuthSchemeParametersProvider: EventBridgeHttpAuthSchemeParametersProvider;
  /**
   * experimentalIdentityAndAuth: abstraction around identity configuration fields
   * @internal
   */
  readonly identityProviderConfig: IdentityProviderConfig;
}

/**
 * @internal
 */
export const resolveHttpAuthSchemeConfig = (config: HttpAuthSchemeInputConfig): HttpAuthSchemeResolvedConfig => {
  const credentials = memoizeIdentityProvider(config.credentials, isIdentityExpired, doesIdentityRequireRefresh);
  const region = config.region ? normalizeProvider(config.region) : undefined;
  return {
    ...config,
    credentials,
    region,
    httpAuthSchemeParametersProvider: defaultEndpointRuleSetHttpAuthSchemeParametersProvider,
    identityProviderConfig: new DefaultIdentityProviderConfig({
      "aws.auth#sigv4": credentials,
    }),
  };
};

/**
 * @internal
 */
export interface EventBridgeEndpointRuleSetHttpAuthSchemeParameters
  extends EndpointParameters,
    EventBridgeHttpAuthSchemeParameters {}

/**
 * @internal
 */
export interface EventBridgeEndpointRuleSetHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<
    EventBridgeClientResolvedConfig,
    EventBridgeEndpointRuleSetHttpAuthSchemeParameters
  > {}

/**
 * @internal
 */
export const defaultEndpointRuleSetHttpAuthSchemeParametersProvider: EventBridgeEndpointRuleSetHttpAuthSchemeParametersProvider =
  async (config, context, input) => {
    if (!input) {
      throw new Error(`Could not find \`input\` for \`endpointHttpAuthSchemeParametersProvider\``);
    }
    const defaultParameters = await defaultEventBridgeHttpAuthSchemeParametersProvider(config, context, input);
    const operation = context.commandName;
    let selectedOperation: string | undefined = undefined;
    let instructionsFn: (() => EndpointParameterInstructions) | undefined = undefined;
    switch (operation) {
      case ActivateEventSourceCommand.name: {
        selectedOperation = operation;
        instructionsFn = ActivateEventSourceCommand.getEndpointParameterInstructions;
        break;
      }
      case CancelReplayCommand.name: {
        selectedOperation = operation;
        instructionsFn = CancelReplayCommand.getEndpointParameterInstructions;
        break;
      }
      case CreateApiDestinationCommand.name: {
        selectedOperation = operation;
        instructionsFn = CreateApiDestinationCommand.getEndpointParameterInstructions;
        break;
      }
      case CreateArchiveCommand.name: {
        selectedOperation = operation;
        instructionsFn = CreateArchiveCommand.getEndpointParameterInstructions;
        break;
      }
      case CreateConnectionCommand.name: {
        selectedOperation = operation;
        instructionsFn = CreateConnectionCommand.getEndpointParameterInstructions;
        break;
      }
      case CreateEndpointCommand.name: {
        selectedOperation = operation;
        instructionsFn = CreateEndpointCommand.getEndpointParameterInstructions;
        break;
      }
      case CreateEventBusCommand.name: {
        selectedOperation = operation;
        instructionsFn = CreateEventBusCommand.getEndpointParameterInstructions;
        break;
      }
      case CreatePartnerEventSourceCommand.name: {
        selectedOperation = operation;
        instructionsFn = CreatePartnerEventSourceCommand.getEndpointParameterInstructions;
        break;
      }
      case DeactivateEventSourceCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeactivateEventSourceCommand.getEndpointParameterInstructions;
        break;
      }
      case DeauthorizeConnectionCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeauthorizeConnectionCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteApiDestinationCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteApiDestinationCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteArchiveCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteArchiveCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteConnectionCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteConnectionCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteEndpointCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteEndpointCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteEventBusCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteEventBusCommand.getEndpointParameterInstructions;
        break;
      }
      case DeletePartnerEventSourceCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeletePartnerEventSourceCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteRuleCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteRuleCommand.getEndpointParameterInstructions;
        break;
      }
      case DescribeApiDestinationCommand.name: {
        selectedOperation = operation;
        instructionsFn = DescribeApiDestinationCommand.getEndpointParameterInstructions;
        break;
      }
      case DescribeArchiveCommand.name: {
        selectedOperation = operation;
        instructionsFn = DescribeArchiveCommand.getEndpointParameterInstructions;
        break;
      }
      case DescribeConnectionCommand.name: {
        selectedOperation = operation;
        instructionsFn = DescribeConnectionCommand.getEndpointParameterInstructions;
        break;
      }
      case DescribeEndpointCommand.name: {
        selectedOperation = operation;
        instructionsFn = DescribeEndpointCommand.getEndpointParameterInstructions;
        break;
      }
      case DescribeEventBusCommand.name: {
        selectedOperation = operation;
        instructionsFn = DescribeEventBusCommand.getEndpointParameterInstructions;
        break;
      }
      case DescribeEventSourceCommand.name: {
        selectedOperation = operation;
        instructionsFn = DescribeEventSourceCommand.getEndpointParameterInstructions;
        break;
      }
      case DescribePartnerEventSourceCommand.name: {
        selectedOperation = operation;
        instructionsFn = DescribePartnerEventSourceCommand.getEndpointParameterInstructions;
        break;
      }
      case DescribeReplayCommand.name: {
        selectedOperation = operation;
        instructionsFn = DescribeReplayCommand.getEndpointParameterInstructions;
        break;
      }
      case DescribeRuleCommand.name: {
        selectedOperation = operation;
        instructionsFn = DescribeRuleCommand.getEndpointParameterInstructions;
        break;
      }
      case DisableRuleCommand.name: {
        selectedOperation = operation;
        instructionsFn = DisableRuleCommand.getEndpointParameterInstructions;
        break;
      }
      case EnableRuleCommand.name: {
        selectedOperation = operation;
        instructionsFn = EnableRuleCommand.getEndpointParameterInstructions;
        break;
      }
      case ListApiDestinationsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListApiDestinationsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListArchivesCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListArchivesCommand.getEndpointParameterInstructions;
        break;
      }
      case ListConnectionsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListConnectionsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListEndpointsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListEndpointsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListEventBusesCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListEventBusesCommand.getEndpointParameterInstructions;
        break;
      }
      case ListEventSourcesCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListEventSourcesCommand.getEndpointParameterInstructions;
        break;
      }
      case ListPartnerEventSourceAccountsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListPartnerEventSourceAccountsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListPartnerEventSourcesCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListPartnerEventSourcesCommand.getEndpointParameterInstructions;
        break;
      }
      case ListReplaysCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListReplaysCommand.getEndpointParameterInstructions;
        break;
      }
      case ListRuleNamesByTargetCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListRuleNamesByTargetCommand.getEndpointParameterInstructions;
        break;
      }
      case ListRulesCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListRulesCommand.getEndpointParameterInstructions;
        break;
      }
      case ListTagsForResourceCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListTagsForResourceCommand.getEndpointParameterInstructions;
        break;
      }
      case ListTargetsByRuleCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListTargetsByRuleCommand.getEndpointParameterInstructions;
        break;
      }
      case PutEventsCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutEventsCommand.getEndpointParameterInstructions;
        break;
      }
      case PutPartnerEventsCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutPartnerEventsCommand.getEndpointParameterInstructions;
        break;
      }
      case PutPermissionCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutPermissionCommand.getEndpointParameterInstructions;
        break;
      }
      case PutRuleCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutRuleCommand.getEndpointParameterInstructions;
        break;
      }
      case PutTargetsCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutTargetsCommand.getEndpointParameterInstructions;
        break;
      }
      case RemovePermissionCommand.name: {
        selectedOperation = operation;
        instructionsFn = RemovePermissionCommand.getEndpointParameterInstructions;
        break;
      }
      case RemoveTargetsCommand.name: {
        selectedOperation = operation;
        instructionsFn = RemoveTargetsCommand.getEndpointParameterInstructions;
        break;
      }
      case StartReplayCommand.name: {
        selectedOperation = operation;
        instructionsFn = StartReplayCommand.getEndpointParameterInstructions;
        break;
      }
      case TagResourceCommand.name: {
        selectedOperation = operation;
        instructionsFn = TagResourceCommand.getEndpointParameterInstructions;
        break;
      }
      case TestEventPatternCommand.name: {
        selectedOperation = operation;
        instructionsFn = TestEventPatternCommand.getEndpointParameterInstructions;
        break;
      }
      case UntagResourceCommand.name: {
        selectedOperation = operation;
        instructionsFn = UntagResourceCommand.getEndpointParameterInstructions;
        break;
      }
      case UpdateApiDestinationCommand.name: {
        selectedOperation = operation;
        instructionsFn = UpdateApiDestinationCommand.getEndpointParameterInstructions;
        break;
      }
      case UpdateArchiveCommand.name: {
        selectedOperation = operation;
        instructionsFn = UpdateArchiveCommand.getEndpointParameterInstructions;
        break;
      }
      case UpdateConnectionCommand.name: {
        selectedOperation = operation;
        instructionsFn = UpdateConnectionCommand.getEndpointParameterInstructions;
        break;
      }
      case UpdateEndpointCommand.name: {
        selectedOperation = operation;
        instructionsFn = UpdateEndpointCommand.getEndpointParameterInstructions;
        break;
      }
      default: {
        throw new Error(
          `Operation \`${operation}\` is not supported in this version of the SDK, please update to the latest version`
        );
      }
    }
    if (!instructionsFn) {
      throw new Error(`getEndpointParameterInstructions() is not defined on \`${selectedOperation}\``);
    }
    const endpointParameters = resolveParams(
      input,
      { getEndpointParameterInstructions: instructionsFn },
      { ...config }
    );
    return {
      ...defaultParameters,
      ...endpointParameters,
    };
  };

/**
 * @internal
 */
export interface EventBridgeEndpointRuleSetHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<EventBridgeEndpointRuleSetHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultEndpointRuleSetHttpAuthSchemeProvider: EventBridgeEndpointRuleSetHttpAuthSchemeProvider =
  createEndpointRuleSetHttpAuthSchemeProvider(defaultEndpointResolver, defaultEventBridgeHttpAuthSchemeProvider);
