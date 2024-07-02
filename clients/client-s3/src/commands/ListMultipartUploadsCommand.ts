// smithy-typescript generated code
import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";

import { commonParams } from "../endpoint/EndpointParameters";
import { ListMultipartUploadsOutput, ListMultipartUploadsRequest } from "../models/models_0";
import { de_ListMultipartUploadsCommand, se_ListMultipartUploadsCommand } from "../protocols/Aws_restXml";
import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";

/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link ListMultipartUploadsCommand}.
 */
export interface ListMultipartUploadsCommandInput extends ListMultipartUploadsRequest {}
/**
 * @public
 *
 * The output of {@link ListMultipartUploadsCommand}.
 */
export interface ListMultipartUploadsCommandOutput extends ListMultipartUploadsOutput, __MetadataBearer {}

/**
 * <p>This operation lists in-progress multipart uploads in a bucket. An in-progress multipart upload is a
 *          multipart upload that has been initiated by the <code>CreateMultipartUpload</code> request, but
 *          has not yet been completed or aborted.</p>
 *          <note>
 *             <p>
 *                <b>Directory buckets</b> -
 *             If multipart uploads in a directory bucket are in progress, you can't delete the bucket until all the in-progress multipart uploads are aborted or completed.
 *             </p>
 *          </note>
 *          <p>The <code>ListMultipartUploads</code> operation returns a maximum of 1,000 multipart uploads in the response. The limit of 1,000 multipart
 *          uploads is also the default
 *          value. You can further limit the number of uploads in a response by specifying the
 *          <code>max-uploads</code> request parameter. If there are more than 1,000 multipart uploads that
 *          satisfy your <code>ListMultipartUploads</code> request, the response returns an <code>IsTruncated</code> element
 *          with the value of <code>true</code>, a <code>NextKeyMarker</code> element, and a <code>NextUploadIdMarker</code> element.
 *          To list the remaining multipart uploads, you need to make subsequent <code>ListMultipartUploads</code> requests.
 *          In these requests, include two query parameters: <code>key-marker</code> and <code>upload-id-marker</code>.
 *          Set the value of <code>key-marker</code> to the <code>NextKeyMarker</code> value from the previous response.
 *          Similarly, set the value of <code>upload-id-marker</code> to the <code>NextUploadIdMarker</code> value from the previous response.</p>
 *          <note>
 *             <p>
 *                <b>Directory buckets</b> - The <code>upload-id-marker</code> element and
 *          the <code>NextUploadIdMarker</code> element aren't supported by directory buckets.
 *          To list the additional multipart uploads, you only need to set the value of <code>key-marker</code> to the <code>NextKeyMarker</code> value from the previous response. </p>
 *          </note>
 *          <p>For more information about multipart uploads, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/uploadobjusingmpu.html">Uploading Objects Using Multipart
 *          Upload</a> in the <i>Amazon S3
 *             User Guide</i>.</p>
 *          <note>
 *             <p>
 *                <b>Directory buckets</b> -  For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format <code>https://<i>bucket_name</i>.s3express-<i>az_id</i>.<i>region</i>.amazonaws.com/<i>key-name</i>
 *                </code>. Path-style requests are not supported. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-express-Regions-and-Zones.html">Regional and Zonal endpoints</a> in the
 *     <i>Amazon S3 User Guide</i>.</p>
 *          </note>
 *          <dl>
 *             <dt>Permissions</dt>
 *             <dd>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <b>General purpose bucket permissions</b> - For information about permissions required to use the multipart upload API, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuAndPermissions.html">Multipart Upload
 *                         and Permissions</a> in the <i>Amazon S3
 *                            User Guide</i>.</p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <b>Directory bucket permissions</b> - To grant access to this API operation on a directory bucket, we recommend that you use the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateSession.html">
 *                            <code>CreateSession</code>
 *                         </a> API operation for session-based authorization. Specifically, you grant the <code>s3express:CreateSession</code> permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the <code>CreateSession</code> API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another <code>CreateSession</code> API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateSession.html">
 *                            <code>CreateSession</code>
 *                         </a>.</p>
 *                   </li>
 *                </ul>
 *             </dd>
 *             <dt>Sorting of multipart uploads in response</dt>
 *             <dd>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <b>General purpose bucket</b> - In the <code>ListMultipartUploads</code> response, the multipart uploads are sorted based on two criteria:</p>
 *                      <ul>
 *                         <li>
 *                            <p>Key-based sorting - Multipart uploads are initially sorted in ascending order based on their object keys.</p>
 *                         </li>
 *                         <li>
 *                            <p>Time-based sorting - For uploads that share the same object key,
 *                               they are further sorted in ascending order based on the upload initiation time. Among uploads with the same key, the one that was initiated first will appear before the ones that were initiated later.</p>
 *                         </li>
 *                      </ul>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <b>Directory bucket</b> - In the <code>ListMultipartUploads</code> response, the multipart uploads aren't sorted lexicographically based on the object keys.
 *
 *                         </p>
 *                   </li>
 *                </ul>
 *             </dd>
 *             <dt>HTTP Host header syntax</dt>
 *             <dd>
 *                <p>
 *                   <b>Directory buckets </b> - The HTTP Host header syntax is <code>
 *                      <i>Bucket_name</i>.s3express-<i>az_id</i>.<i>region</i>.amazonaws.com</code>.</p>
 *             </dd>
 *          </dl>
 *          <p>The following operations are related to <code>ListMultipartUploads</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html">CreateMultipartUpload</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html">UploadPart</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html">CompleteMultipartUpload</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListParts.html">ListParts</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_AbortMultipartUpload.html">AbortMultipartUpload</a>
 *                </p>
 *             </li>
 *          </ul>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { S3Client, ListMultipartUploadsCommand } from "@aws-sdk/client-s3"; // ES Modules import
 * // const { S3Client, ListMultipartUploadsCommand } = require("@aws-sdk/client-s3"); // CommonJS import
 * const client = new S3Client(config);
 * const input = { // ListMultipartUploadsRequest
 *   Bucket: "STRING_VALUE", // required
 *   Delimiter: "STRING_VALUE",
 *   EncodingType: "url",
 *   KeyMarker: "STRING_VALUE",
 *   MaxUploads: Number("int"),
 *   Prefix: "STRING_VALUE",
 *   UploadIdMarker: "STRING_VALUE",
 *   ExpectedBucketOwner: "STRING_VALUE",
 *   RequestPayer: "requester",
 * };
 * const command = new ListMultipartUploadsCommand(input);
 * const response = await client.send(command);
 * // { // ListMultipartUploadsOutput
 * //   Bucket: "STRING_VALUE",
 * //   KeyMarker: "STRING_VALUE",
 * //   UploadIdMarker: "STRING_VALUE",
 * //   NextKeyMarker: "STRING_VALUE",
 * //   Prefix: "STRING_VALUE",
 * //   Delimiter: "STRING_VALUE",
 * //   NextUploadIdMarker: "STRING_VALUE",
 * //   MaxUploads: Number("int"),
 * //   IsTruncated: true || false,
 * //   Uploads: [ // MultipartUploadList
 * //     { // MultipartUpload
 * //       UploadId: "STRING_VALUE",
 * //       Key: "STRING_VALUE",
 * //       Initiated: new Date("TIMESTAMP"),
 * //       StorageClass: "STANDARD" || "REDUCED_REDUNDANCY" || "STANDARD_IA" || "ONEZONE_IA" || "INTELLIGENT_TIERING" || "GLACIER" || "DEEP_ARCHIVE" || "OUTPOSTS" || "GLACIER_IR" || "SNOW" || "EXPRESS_ONEZONE",
 * //       Owner: { // Owner
 * //         DisplayName: "STRING_VALUE",
 * //         ID: "STRING_VALUE",
 * //       },
 * //       Initiator: { // Initiator
 * //         ID: "STRING_VALUE",
 * //         DisplayName: "STRING_VALUE",
 * //       },
 * //       ChecksumAlgorithm: "CRC32" || "CRC32C" || "SHA1" || "SHA256",
 * //     },
 * //   ],
 * //   CommonPrefixes: [ // CommonPrefixList
 * //     { // CommonPrefix
 * //       Prefix: "STRING_VALUE",
 * //     },
 * //   ],
 * //   EncodingType: "url",
 * //   RequestCharged: "requester",
 * // };
 *
 * ```
 *
 * @param ListMultipartUploadsCommandInput - {@link ListMultipartUploadsCommandInput}
 * @returns {@link ListMultipartUploadsCommandOutput}
 * @see {@link ListMultipartUploadsCommandInput} for command's `input` shape.
 * @see {@link ListMultipartUploadsCommandOutput} for command's `response` shape.
 * @see {@link S3ClientResolvedConfig | config} for S3Client's `config` shape.
 *
 * @throws {@link S3ServiceException}
 * <p>Base exception class for all service exceptions from S3 service.</p>
 *
 * @public
 */
// @ts-expect-error: Command class references itself
export class ListMultipartUploadsCommand extends $Command
  .classBuilder<
    ListMultipartUploadsCommandInput,
    ListMultipartUploadsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >()
  .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Prefix: { type: "contextParams", name: "Prefix" },
  })
  .m(function (this: any, Command: any, cs: any, config: S3ClientResolvedConfig, o: any) {
    return [
      getSerdePlugin(config, this.serialize, this.deserialize),
      getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
  })
  .s("AmazonS3", "ListMultipartUploads", {
    endpointRuleSet: {
      // @ts-expect-error: built class has getEndpointParameterInstructions()
      getEndpointParameterInstructions: ListMultipartUploadsCommand.getEndpointParameterInstructions,
    },
  })
  .n("S3Client", "ListMultipartUploadsCommand")
  .f(void 0, void 0)
  .ser(se_ListMultipartUploadsCommand)
  .de(de_ListMultipartUploadsCommand)
  .build() {}
