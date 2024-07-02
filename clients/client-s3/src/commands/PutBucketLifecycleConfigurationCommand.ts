// smithy-typescript generated code
import { getFlexibleChecksumsPlugin } from "@aws-sdk/middleware-flexible-checksums";
import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";

import { commonParams } from "../endpoint/EndpointParameters";
import { PutBucketLifecycleConfigurationRequest } from "../models/models_0";
import {
  de_PutBucketLifecycleConfigurationCommand,
  se_PutBucketLifecycleConfigurationCommand,
} from "../protocols/Aws_restXml";
import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";

/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link PutBucketLifecycleConfigurationCommand}.
 */
export interface PutBucketLifecycleConfigurationCommandInput extends PutBucketLifecycleConfigurationRequest {}
/**
 * @public
 *
 * The output of {@link PutBucketLifecycleConfigurationCommand}.
 */
export interface PutBucketLifecycleConfigurationCommandOutput extends __MetadataBearer {}

/**
 * <note>
 *             <p>This operation is not supported by directory buckets.</p>
 *          </note>
 *          <p>Creates a new lifecycle configuration for the bucket or replaces an existing lifecycle
 *          configuration. Keep in mind that this will overwrite an existing lifecycle configuration,
 *          so if you want to retain any configuration details, they must be included in the new
 *          lifecycle configuration. For information about lifecycle configuration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html">Managing
 *             your storage lifecycle</a>.</p>
 *          <note>
 *             <p>Bucket lifecycle configuration now supports specifying a lifecycle rule using an object key name prefix, one or more object tags, object size, or any combination of these. Accordingly, this section describes the latest API. The previous version of the API supported filtering based only on an object key name prefix, which is supported for backward compatibility.
 *             For the related API description, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycle.html">PutBucketLifecycle</a>.</p>
 *          </note>
 *          <dl>
 *             <dt>Rules</dt>
 *             <dd>
 *                <p>You specify the lifecycle configuration in your request body. The lifecycle
 *                   configuration is specified as XML consisting of one or more rules. An Amazon S3
 *                   Lifecycle configuration can have up to 1,000 rules. This limit is not adjustable.
 *                   Each rule consists of the following:</p>
 *                <ul>
 *                   <li>
 *                      <p>A filter identifying a subset of objects to which the rule applies. The filter can be based on a key name prefix, object tags, object size, or any combination of these.</p>
 *                   </li>
 *                   <li>
 *                      <p>A status indicating whether the rule is in effect.</p>
 *                   </li>
 *                   <li>
 *                      <p>One or more lifecycle transition and expiration actions that you want
 *                         Amazon S3 to perform on the objects identified by the filter. If the state of
 *                         your bucket is versioning-enabled or versioning-suspended, you can have many
 *                         versions of the same object (one current version and zero or more noncurrent
 *                         versions). Amazon S3 provides predefined actions that you can specify for current
 *                         and noncurrent object versions.</p>
 *                   </li>
 *                </ul>
 *                <p>For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html">Object Lifecycle
 *                      Management</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html">Lifecycle Configuration
 *                      Elements</a>.</p>
 *             </dd>
 *             <dt>Permissions</dt>
 *             <dd>
 *                <p>By default, all Amazon S3 resources are private, including buckets, objects, and
 *                   related subresources (for example, lifecycle configuration and website
 *                   configuration). Only the resource owner (that is, the Amazon Web Services account that created
 *                   it) can access the resource. The resource owner can optionally grant access
 *                   permissions to others by writing an access policy. For this operation, a user must
 *                   get the <code>s3:PutLifecycleConfiguration</code> permission.</p>
 *                <p>You can also explicitly deny permissions. An explicit deny also supersedes any
 *                   other permissions. If you want to block users or accounts from removing or
 *                   deleting objects from your bucket, you must deny them permissions for the
 *                   following actions:</p>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <code>s3:DeleteObject</code>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <code>s3:DeleteObjectVersion</code>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <code>s3:PutLifecycleConfiguration</code>
 *                      </p>
 *                   </li>
 *                </ul>
 *                <p>For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-access-control.html">Managing Access
 *                      Permissions to Your Amazon S3 Resources</a>.</p>
 *             </dd>
 *          </dl>
 *          <p>The following operations are related to
 *          <code>PutBucketLifecycleConfiguration</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-configuration-examples.html">Examples of
 *                   Lifecycle Configuration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycleConfiguration.html">GetBucketLifecycleConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketLifecycle.html">DeleteBucketLifecycle</a>
 *                </p>
 *             </li>
 *          </ul>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { S3Client, PutBucketLifecycleConfigurationCommand } from "@aws-sdk/client-s3"; // ES Modules import
 * // const { S3Client, PutBucketLifecycleConfigurationCommand } = require("@aws-sdk/client-s3"); // CommonJS import
 * const client = new S3Client(config);
 * const input = { // PutBucketLifecycleConfigurationRequest
 *   Bucket: "STRING_VALUE", // required
 *   ChecksumAlgorithm: "CRC32" || "CRC32C" || "SHA1" || "SHA256",
 *   LifecycleConfiguration: { // BucketLifecycleConfiguration
 *     Rules: [ // LifecycleRules // required
 *       { // LifecycleRule
 *         Expiration: { // LifecycleExpiration
 *           Date: new Date("TIMESTAMP"),
 *           Days: Number("int"),
 *           ExpiredObjectDeleteMarker: true || false,
 *         },
 *         ID: "STRING_VALUE",
 *         Prefix: "STRING_VALUE",
 *         Filter: { // LifecycleRuleFilter Union: only one key present
 *           Prefix: "STRING_VALUE",
 *           Tag: { // Tag
 *             Key: "STRING_VALUE", // required
 *             Value: "STRING_VALUE", // required
 *           },
 *           ObjectSizeGreaterThan: Number("long"),
 *           ObjectSizeLessThan: Number("long"),
 *           And: { // LifecycleRuleAndOperator
 *             Prefix: "STRING_VALUE",
 *             Tags: [ // TagSet
 *               {
 *                 Key: "STRING_VALUE", // required
 *                 Value: "STRING_VALUE", // required
 *               },
 *             ],
 *             ObjectSizeGreaterThan: Number("long"),
 *             ObjectSizeLessThan: Number("long"),
 *           },
 *         },
 *         Status: "Enabled" || "Disabled", // required
 *         Transitions: [ // TransitionList
 *           { // Transition
 *             Date: new Date("TIMESTAMP"),
 *             Days: Number("int"),
 *             StorageClass: "GLACIER" || "STANDARD_IA" || "ONEZONE_IA" || "INTELLIGENT_TIERING" || "DEEP_ARCHIVE" || "GLACIER_IR",
 *           },
 *         ],
 *         NoncurrentVersionTransitions: [ // NoncurrentVersionTransitionList
 *           { // NoncurrentVersionTransition
 *             NoncurrentDays: Number("int"),
 *             StorageClass: "GLACIER" || "STANDARD_IA" || "ONEZONE_IA" || "INTELLIGENT_TIERING" || "DEEP_ARCHIVE" || "GLACIER_IR",
 *             NewerNoncurrentVersions: Number("int"),
 *           },
 *         ],
 *         NoncurrentVersionExpiration: { // NoncurrentVersionExpiration
 *           NoncurrentDays: Number("int"),
 *           NewerNoncurrentVersions: Number("int"),
 *         },
 *         AbortIncompleteMultipartUpload: { // AbortIncompleteMultipartUpload
 *           DaysAfterInitiation: Number("int"),
 *         },
 *       },
 *     ],
 *   },
 *   ExpectedBucketOwner: "STRING_VALUE",
 * };
 * const command = new PutBucketLifecycleConfigurationCommand(input);
 * const response = await client.send(command);
 * // {};
 *
 * ```
 *
 * @param PutBucketLifecycleConfigurationCommandInput - {@link PutBucketLifecycleConfigurationCommandInput}
 * @returns {@link PutBucketLifecycleConfigurationCommandOutput}
 * @see {@link PutBucketLifecycleConfigurationCommandInput} for command's `input` shape.
 * @see {@link PutBucketLifecycleConfigurationCommandOutput} for command's `response` shape.
 * @see {@link S3ClientResolvedConfig | config} for S3Client's `config` shape.
 *
 * @throws {@link S3ServiceException}
 * <p>Base exception class for all service exceptions from S3 service.</p>
 *
 * @public
 */
// @ts-expect-error: Command class references itself
export class PutBucketLifecycleConfigurationCommand extends $Command
  .classBuilder<
    PutBucketLifecycleConfigurationCommandInput,
    PutBucketLifecycleConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >()
  .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
  })
  .m(function (this: any, Command: any, cs: any, config: S3ClientResolvedConfig, o: any) {
    return [
      getSerdePlugin(config, this.serialize, this.deserialize),
      getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
      getFlexibleChecksumsPlugin(config, {
        input: this.input,
        requestAlgorithmMember: "ChecksumAlgorithm",
        requestChecksumRequired: true,
      }),
    ];
  })
  .s("AmazonS3", "PutBucketLifecycleConfiguration", {
    endpointRuleSet: {
      // @ts-expect-error: built class has getEndpointParameterInstructions()
      getEndpointParameterInstructions: PutBucketLifecycleConfigurationCommand.getEndpointParameterInstructions,
    },
  })
  .n("S3Client", "PutBucketLifecycleConfigurationCommand")
  .f(void 0, void 0)
  .ser(se_PutBucketLifecycleConfigurationCommand)
  .de(de_PutBucketLifecycleConfigurationCommand)
  .build() {}
