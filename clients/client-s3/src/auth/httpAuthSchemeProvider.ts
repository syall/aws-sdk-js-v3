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

import { AbortMultipartUploadCommand } from "../commands/AbortMultipartUploadCommand";
import { CompleteMultipartUploadCommand } from "../commands/CompleteMultipartUploadCommand";
import { CopyObjectCommand } from "../commands/CopyObjectCommand";
import { CreateBucketCommand } from "../commands/CreateBucketCommand";
import { CreateMultipartUploadCommand } from "../commands/CreateMultipartUploadCommand";
import { DeleteBucketAnalyticsConfigurationCommand } from "../commands/DeleteBucketAnalyticsConfigurationCommand";
import { DeleteBucketCommand } from "../commands/DeleteBucketCommand";
import { DeleteBucketCorsCommand } from "../commands/DeleteBucketCorsCommand";
import { DeleteBucketEncryptionCommand } from "../commands/DeleteBucketEncryptionCommand";
import { DeleteBucketIntelligentTieringConfigurationCommand } from "../commands/DeleteBucketIntelligentTieringConfigurationCommand";
import { DeleteBucketInventoryConfigurationCommand } from "../commands/DeleteBucketInventoryConfigurationCommand";
import { DeleteBucketLifecycleCommand } from "../commands/DeleteBucketLifecycleCommand";
import { DeleteBucketMetricsConfigurationCommand } from "../commands/DeleteBucketMetricsConfigurationCommand";
import { DeleteBucketOwnershipControlsCommand } from "../commands/DeleteBucketOwnershipControlsCommand";
import { DeleteBucketPolicyCommand } from "../commands/DeleteBucketPolicyCommand";
import { DeleteBucketReplicationCommand } from "../commands/DeleteBucketReplicationCommand";
import { DeleteBucketTaggingCommand } from "../commands/DeleteBucketTaggingCommand";
import { DeleteBucketWebsiteCommand } from "../commands/DeleteBucketWebsiteCommand";
import { DeleteObjectCommand } from "../commands/DeleteObjectCommand";
import { DeleteObjectsCommand } from "../commands/DeleteObjectsCommand";
import { DeleteObjectTaggingCommand } from "../commands/DeleteObjectTaggingCommand";
import { DeletePublicAccessBlockCommand } from "../commands/DeletePublicAccessBlockCommand";
import { GetBucketAccelerateConfigurationCommand } from "../commands/GetBucketAccelerateConfigurationCommand";
import { GetBucketAclCommand } from "../commands/GetBucketAclCommand";
import { GetBucketAnalyticsConfigurationCommand } from "../commands/GetBucketAnalyticsConfigurationCommand";
import { GetBucketCorsCommand } from "../commands/GetBucketCorsCommand";
import { GetBucketEncryptionCommand } from "../commands/GetBucketEncryptionCommand";
import { GetBucketIntelligentTieringConfigurationCommand } from "../commands/GetBucketIntelligentTieringConfigurationCommand";
import { GetBucketInventoryConfigurationCommand } from "../commands/GetBucketInventoryConfigurationCommand";
import { GetBucketLifecycleConfigurationCommand } from "../commands/GetBucketLifecycleConfigurationCommand";
import { GetBucketLocationCommand } from "../commands/GetBucketLocationCommand";
import { GetBucketLoggingCommand } from "../commands/GetBucketLoggingCommand";
import { GetBucketMetricsConfigurationCommand } from "../commands/GetBucketMetricsConfigurationCommand";
import { GetBucketNotificationConfigurationCommand } from "../commands/GetBucketNotificationConfigurationCommand";
import { GetBucketOwnershipControlsCommand } from "../commands/GetBucketOwnershipControlsCommand";
import { GetBucketPolicyCommand } from "../commands/GetBucketPolicyCommand";
import { GetBucketPolicyStatusCommand } from "../commands/GetBucketPolicyStatusCommand";
import { GetBucketReplicationCommand } from "../commands/GetBucketReplicationCommand";
import { GetBucketRequestPaymentCommand } from "../commands/GetBucketRequestPaymentCommand";
import { GetBucketTaggingCommand } from "../commands/GetBucketTaggingCommand";
import { GetBucketVersioningCommand } from "../commands/GetBucketVersioningCommand";
import { GetBucketWebsiteCommand } from "../commands/GetBucketWebsiteCommand";
import { GetObjectAclCommand } from "../commands/GetObjectAclCommand";
import { GetObjectAttributesCommand } from "../commands/GetObjectAttributesCommand";
import { GetObjectCommand } from "../commands/GetObjectCommand";
import { GetObjectLegalHoldCommand } from "../commands/GetObjectLegalHoldCommand";
import { GetObjectLockConfigurationCommand } from "../commands/GetObjectLockConfigurationCommand";
import { GetObjectRetentionCommand } from "../commands/GetObjectRetentionCommand";
import { GetObjectTaggingCommand } from "../commands/GetObjectTaggingCommand";
import { GetObjectTorrentCommand } from "../commands/GetObjectTorrentCommand";
import { GetPublicAccessBlockCommand } from "../commands/GetPublicAccessBlockCommand";
import { HeadBucketCommand } from "../commands/HeadBucketCommand";
import { HeadObjectCommand } from "../commands/HeadObjectCommand";
import { ListBucketAnalyticsConfigurationsCommand } from "../commands/ListBucketAnalyticsConfigurationsCommand";
import { ListBucketIntelligentTieringConfigurationsCommand } from "../commands/ListBucketIntelligentTieringConfigurationsCommand";
import { ListBucketInventoryConfigurationsCommand } from "../commands/ListBucketInventoryConfigurationsCommand";
import { ListBucketMetricsConfigurationsCommand } from "../commands/ListBucketMetricsConfigurationsCommand";
import { ListBucketsCommand } from "../commands/ListBucketsCommand";
import { ListMultipartUploadsCommand } from "../commands/ListMultipartUploadsCommand";
import { ListObjectsCommand } from "../commands/ListObjectsCommand";
import { ListObjectsV2Command } from "../commands/ListObjectsV2Command";
import { ListObjectVersionsCommand } from "../commands/ListObjectVersionsCommand";
import { ListPartsCommand } from "../commands/ListPartsCommand";
import { PutBucketAccelerateConfigurationCommand } from "../commands/PutBucketAccelerateConfigurationCommand";
import { PutBucketAclCommand } from "../commands/PutBucketAclCommand";
import { PutBucketAnalyticsConfigurationCommand } from "../commands/PutBucketAnalyticsConfigurationCommand";
import { PutBucketCorsCommand } from "../commands/PutBucketCorsCommand";
import { PutBucketEncryptionCommand } from "../commands/PutBucketEncryptionCommand";
import { PutBucketIntelligentTieringConfigurationCommand } from "../commands/PutBucketIntelligentTieringConfigurationCommand";
import { PutBucketInventoryConfigurationCommand } from "../commands/PutBucketInventoryConfigurationCommand";
import { PutBucketLifecycleConfigurationCommand } from "../commands/PutBucketLifecycleConfigurationCommand";
import { PutBucketLoggingCommand } from "../commands/PutBucketLoggingCommand";
import { PutBucketMetricsConfigurationCommand } from "../commands/PutBucketMetricsConfigurationCommand";
import { PutBucketNotificationConfigurationCommand } from "../commands/PutBucketNotificationConfigurationCommand";
import { PutBucketOwnershipControlsCommand } from "../commands/PutBucketOwnershipControlsCommand";
import { PutBucketPolicyCommand } from "../commands/PutBucketPolicyCommand";
import { PutBucketReplicationCommand } from "../commands/PutBucketReplicationCommand";
import { PutBucketRequestPaymentCommand } from "../commands/PutBucketRequestPaymentCommand";
import { PutBucketTaggingCommand } from "../commands/PutBucketTaggingCommand";
import { PutBucketVersioningCommand } from "../commands/PutBucketVersioningCommand";
import { PutBucketWebsiteCommand } from "../commands/PutBucketWebsiteCommand";
import { PutObjectAclCommand } from "../commands/PutObjectAclCommand";
import { PutObjectCommand } from "../commands/PutObjectCommand";
import { PutObjectLegalHoldCommand } from "../commands/PutObjectLegalHoldCommand";
import { PutObjectLockConfigurationCommand } from "../commands/PutObjectLockConfigurationCommand";
import { PutObjectRetentionCommand } from "../commands/PutObjectRetentionCommand";
import { PutObjectTaggingCommand } from "../commands/PutObjectTaggingCommand";
import { PutPublicAccessBlockCommand } from "../commands/PutPublicAccessBlockCommand";
import { RestoreObjectCommand } from "../commands/RestoreObjectCommand";
import { SelectObjectContentCommand } from "../commands/SelectObjectContentCommand";
import { UploadPartCommand } from "../commands/UploadPartCommand";
import { UploadPartCopyCommand } from "../commands/UploadPartCopyCommand";
import { WriteGetObjectResponseCommand } from "../commands/WriteGetObjectResponseCommand";
import { EndpointParameters } from "../endpoint/EndpointParameters";
import { defaultEndpointResolver } from "../endpoint/endpointResolver";
import { S3ClientResolvedConfig } from "../S3Client";

/**
 * @internal
 */
export interface S3HttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}

/**
 * @internal
 */
export interface S3HttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<S3ClientResolvedConfig, S3HttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultS3HttpAuthSchemeParametersProvider: S3HttpAuthSchemeParametersProvider = async (
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

function createAwsAuthSigv4HttpAuthOption(authParameters: S3HttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "s3",
      region: authParameters.region,
    },
  };
}

function createAwsAuthSigv4aHttpAuthOption(authParameters: S3HttpAuthSchemeParameters): HttpAuthOption {
  return {
    schemeId: "aws.auth#sigv4a",
    signingProperties: {
      name: "s3",
      region: authParameters.region,
    },
  };
}

/**
 * @internal
 */
export interface S3HttpAuthSchemeProvider extends HttpAuthSchemeProvider<S3HttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultS3HttpAuthSchemeProvider: S3HttpAuthSchemeProvider = (authParameters) => {
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
  readonly httpAuthSchemeParametersProvider: S3HttpAuthSchemeParametersProvider;
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
export interface S3EndpointRuleSetHttpAuthSchemeParameters extends EndpointParameters, S3HttpAuthSchemeParameters {}

/**
 * @internal
 */
export interface S3EndpointRuleSetHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<S3ClientResolvedConfig, S3EndpointRuleSetHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultEndpointRuleSetHttpAuthSchemeParametersProvider: S3EndpointRuleSetHttpAuthSchemeParametersProvider =
  async (config, context, input) => {
    if (!input) {
      throw new Error(`Could not find \`input\` for \`endpointHttpAuthSchemeParametersProvider\``);
    }
    const defaultParameters = await defaultS3HttpAuthSchemeParametersProvider(config, context, input);
    const operation = context.commandName;
    let selectedOperation: string | undefined = undefined;
    let instructionsFn: (() => EndpointParameterInstructions) | undefined = undefined;
    switch (operation) {
      case AbortMultipartUploadCommand.name: {
        selectedOperation = operation;
        instructionsFn = AbortMultipartUploadCommand.getEndpointParameterInstructions;
        break;
      }
      case CompleteMultipartUploadCommand.name: {
        selectedOperation = operation;
        instructionsFn = CompleteMultipartUploadCommand.getEndpointParameterInstructions;
        break;
      }
      case CopyObjectCommand.name: {
        selectedOperation = operation;
        instructionsFn = CopyObjectCommand.getEndpointParameterInstructions;
        break;
      }
      case CreateBucketCommand.name: {
        selectedOperation = operation;
        instructionsFn = CreateBucketCommand.getEndpointParameterInstructions;
        break;
      }
      case CreateMultipartUploadCommand.name: {
        selectedOperation = operation;
        instructionsFn = CreateMultipartUploadCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketAnalyticsConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketAnalyticsConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketCorsCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketCorsCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketEncryptionCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketEncryptionCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketIntelligentTieringConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketIntelligentTieringConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketInventoryConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketInventoryConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketLifecycleCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketLifecycleCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketMetricsConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketMetricsConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketOwnershipControlsCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketOwnershipControlsCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketPolicyCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketPolicyCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketReplicationCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketReplicationCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketTaggingCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketTaggingCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteBucketWebsiteCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteBucketWebsiteCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteObjectCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteObjectCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteObjectsCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteObjectsCommand.getEndpointParameterInstructions;
        break;
      }
      case DeleteObjectTaggingCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeleteObjectTaggingCommand.getEndpointParameterInstructions;
        break;
      }
      case DeletePublicAccessBlockCommand.name: {
        selectedOperation = operation;
        instructionsFn = DeletePublicAccessBlockCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketAccelerateConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketAccelerateConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketAclCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketAclCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketAnalyticsConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketAnalyticsConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketCorsCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketCorsCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketEncryptionCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketEncryptionCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketIntelligentTieringConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketIntelligentTieringConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketInventoryConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketInventoryConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketLifecycleConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketLifecycleConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketLocationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketLocationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketLoggingCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketLoggingCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketMetricsConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketMetricsConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketNotificationConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketNotificationConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketOwnershipControlsCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketOwnershipControlsCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketPolicyCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketPolicyCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketPolicyStatusCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketPolicyStatusCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketReplicationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketReplicationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketRequestPaymentCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketRequestPaymentCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketTaggingCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketTaggingCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketVersioningCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketVersioningCommand.getEndpointParameterInstructions;
        break;
      }
      case GetBucketWebsiteCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetBucketWebsiteCommand.getEndpointParameterInstructions;
        break;
      }
      case GetObjectCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetObjectCommand.getEndpointParameterInstructions;
        break;
      }
      case GetObjectAclCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetObjectAclCommand.getEndpointParameterInstructions;
        break;
      }
      case GetObjectAttributesCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetObjectAttributesCommand.getEndpointParameterInstructions;
        break;
      }
      case GetObjectLegalHoldCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetObjectLegalHoldCommand.getEndpointParameterInstructions;
        break;
      }
      case GetObjectLockConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetObjectLockConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case GetObjectRetentionCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetObjectRetentionCommand.getEndpointParameterInstructions;
        break;
      }
      case GetObjectTaggingCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetObjectTaggingCommand.getEndpointParameterInstructions;
        break;
      }
      case GetObjectTorrentCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetObjectTorrentCommand.getEndpointParameterInstructions;
        break;
      }
      case GetPublicAccessBlockCommand.name: {
        selectedOperation = operation;
        instructionsFn = GetPublicAccessBlockCommand.getEndpointParameterInstructions;
        break;
      }
      case HeadBucketCommand.name: {
        selectedOperation = operation;
        instructionsFn = HeadBucketCommand.getEndpointParameterInstructions;
        break;
      }
      case HeadObjectCommand.name: {
        selectedOperation = operation;
        instructionsFn = HeadObjectCommand.getEndpointParameterInstructions;
        break;
      }
      case ListBucketAnalyticsConfigurationsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListBucketAnalyticsConfigurationsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListBucketIntelligentTieringConfigurationsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListBucketIntelligentTieringConfigurationsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListBucketInventoryConfigurationsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListBucketInventoryConfigurationsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListBucketMetricsConfigurationsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListBucketMetricsConfigurationsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListBucketsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListBucketsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListMultipartUploadsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListMultipartUploadsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListObjectsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListObjectsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListObjectsV2Command.name: {
        selectedOperation = operation;
        instructionsFn = ListObjectsV2Command.getEndpointParameterInstructions;
        break;
      }
      case ListObjectVersionsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListObjectVersionsCommand.getEndpointParameterInstructions;
        break;
      }
      case ListPartsCommand.name: {
        selectedOperation = operation;
        instructionsFn = ListPartsCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketAccelerateConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketAccelerateConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketAclCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketAclCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketAnalyticsConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketAnalyticsConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketCorsCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketCorsCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketEncryptionCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketEncryptionCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketIntelligentTieringConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketIntelligentTieringConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketInventoryConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketInventoryConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketLifecycleConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketLifecycleConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketLoggingCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketLoggingCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketMetricsConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketMetricsConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketNotificationConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketNotificationConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketOwnershipControlsCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketOwnershipControlsCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketPolicyCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketPolicyCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketReplicationCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketReplicationCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketRequestPaymentCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketRequestPaymentCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketTaggingCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketTaggingCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketVersioningCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketVersioningCommand.getEndpointParameterInstructions;
        break;
      }
      case PutBucketWebsiteCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutBucketWebsiteCommand.getEndpointParameterInstructions;
        break;
      }
      case PutObjectCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutObjectCommand.getEndpointParameterInstructions;
        break;
      }
      case PutObjectAclCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutObjectAclCommand.getEndpointParameterInstructions;
        break;
      }
      case PutObjectLegalHoldCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutObjectLegalHoldCommand.getEndpointParameterInstructions;
        break;
      }
      case PutObjectLockConfigurationCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutObjectLockConfigurationCommand.getEndpointParameterInstructions;
        break;
      }
      case PutObjectRetentionCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutObjectRetentionCommand.getEndpointParameterInstructions;
        break;
      }
      case PutObjectTaggingCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutObjectTaggingCommand.getEndpointParameterInstructions;
        break;
      }
      case PutPublicAccessBlockCommand.name: {
        selectedOperation = operation;
        instructionsFn = PutPublicAccessBlockCommand.getEndpointParameterInstructions;
        break;
      }
      case RestoreObjectCommand.name: {
        selectedOperation = operation;
        instructionsFn = RestoreObjectCommand.getEndpointParameterInstructions;
        break;
      }
      case SelectObjectContentCommand.name: {
        selectedOperation = operation;
        instructionsFn = SelectObjectContentCommand.getEndpointParameterInstructions;
        break;
      }
      case UploadPartCommand.name: {
        selectedOperation = operation;
        instructionsFn = UploadPartCommand.getEndpointParameterInstructions;
        break;
      }
      case UploadPartCopyCommand.name: {
        selectedOperation = operation;
        instructionsFn = UploadPartCopyCommand.getEndpointParameterInstructions;
        break;
      }
      case WriteGetObjectResponseCommand.name: {
        selectedOperation = operation;
        instructionsFn = WriteGetObjectResponseCommand.getEndpointParameterInstructions;
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
export interface S3EndpointRuleSetHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<S3EndpointRuleSetHttpAuthSchemeParameters> {}

/**
 * @internal
 */
export const defaultEndpointRuleSetHttpAuthSchemeProvider: S3EndpointRuleSetHttpAuthSchemeProvider =
  createEndpointRuleSetHttpAuthSchemeProvider(defaultEndpointResolver, defaultS3HttpAuthSchemeProvider);
