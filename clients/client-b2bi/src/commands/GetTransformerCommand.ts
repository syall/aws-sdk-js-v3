// smithy-typescript generated code
import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";

import { B2biClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../B2biClient";
import { commonParams } from "../endpoint/EndpointParameters";
import { GetTransformerRequest, GetTransformerResponse } from "../models/models_0";
import { de_GetTransformerCommand, se_GetTransformerCommand } from "../protocols/Aws_json1_0";

/**
 * @public
 */
export { __MetadataBearer, $Command };
/**
 * @public
 *
 * The input for {@link GetTransformerCommand}.
 */
export interface GetTransformerCommandInput extends GetTransformerRequest {}
/**
 * @public
 *
 * The output of {@link GetTransformerCommand}.
 */
export interface GetTransformerCommandOutput extends GetTransformerResponse, __MetadataBearer {}

/**
 * <p>Retrieves the details for the transformer specified by the transformer ID. A transformer
 *    describes how to process the incoming EDI documents and extract the necessary
 *    information to the output file.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { B2biClient, GetTransformerCommand } from "@aws-sdk/client-b2bi"; // ES Modules import
 * // const { B2biClient, GetTransformerCommand } = require("@aws-sdk/client-b2bi"); // CommonJS import
 * const client = new B2biClient(config);
 * const input = { // GetTransformerRequest
 *   transformerId: "STRING_VALUE", // required
 * };
 * const command = new GetTransformerCommand(input);
 * const response = await client.send(command);
 * // { // GetTransformerResponse
 * //   transformerId: "STRING_VALUE", // required
 * //   transformerArn: "STRING_VALUE", // required
 * //   name: "STRING_VALUE", // required
 * //   fileFormat: "XML" || "JSON", // required
 * //   mappingTemplate: "STRING_VALUE", // required
 * //   status: "active" || "inactive", // required
 * //   ediType: { // EdiType Union: only one key present
 * //     x12Details: { // X12Details
 * //       transactionSet: "X12_110" || "X12_180" || "X12_204" || "X12_210" || "X12_211" || "X12_214" || "X12_215" || "X12_259" || "X12_260" || "X12_266" || "X12_269" || "X12_270" || "X12_271" || "X12_274" || "X12_275" || "X12_276" || "X12_277" || "X12_278" || "X12_310" || "X12_315" || "X12_322" || "X12_404" || "X12_410" || "X12_417" || "X12_421" || "X12_426" || "X12_810" || "X12_820" || "X12_824" || "X12_830" || "X12_832" || "X12_834" || "X12_835" || "X12_837" || "X12_844" || "X12_846" || "X12_849" || "X12_850" || "X12_852" || "X12_855" || "X12_856" || "X12_860" || "X12_861" || "X12_864" || "X12_865" || "X12_869" || "X12_870" || "X12_940" || "X12_945" || "X12_990" || "X12_997" || "X12_999" || "X12_270_X279" || "X12_271_X279" || "X12_275_X210" || "X12_275_X211" || "X12_276_X212" || "X12_277_X212" || "X12_277_X214" || "X12_277_X364" || "X12_278_X217" || "X12_820_X218" || "X12_820_X306" || "X12_824_X186" || "X12_834_X220" || "X12_834_X307" || "X12_834_X318" || "X12_835_X221" || "X12_837_X222" || "X12_837_X223" || "X12_837_X224" || "X12_837_X291" || "X12_837_X292" || "X12_837_X298" || "X12_999_X231",
 * //       version: "VERSION_4010" || "VERSION_4030" || "VERSION_5010" || "VERSION_5010_HIPAA",
 * //     },
 * //   },
 * //   sampleDocument: "STRING_VALUE",
 * //   createdAt: new Date("TIMESTAMP"), // required
 * //   modifiedAt: new Date("TIMESTAMP"),
 * // };
 *
 * ```
 *
 * @param GetTransformerCommandInput - {@link GetTransformerCommandInput}
 * @returns {@link GetTransformerCommandOutput}
 * @see {@link GetTransformerCommandInput} for command's `input` shape.
 * @see {@link GetTransformerCommandOutput} for command's `response` shape.
 * @see {@link B2biClientResolvedConfig | config} for B2biClient's `config` shape.
 *
 * @throws {@link AccessDeniedException} (client fault)
 *  <p>You do not have sufficient access to perform this action.</p>
 *
 * @throws {@link InternalServerException} (server fault)
 *  <p>This exception is thrown when an error occurs in the Amazon Web Services B2B Data Interchange service.</p>
 *
 * @throws {@link ResourceNotFoundException} (client fault)
 *  <p>Occurs when the requested resource does not exist, or cannot be found. In some cases, the resource exists in a region other than the region specified in the API call.</p>
 *
 * @throws {@link ThrottlingException} (client fault)
 *  <p>The request was denied due to throttling: the data speed and rendering may be limited depending on various parameters and conditions.</p>
 *
 * @throws {@link ValidationException} (client fault)
 *  <p>Occurs when a B2BI object cannot be validated against a request from another object.</p>
 *
 * @throws {@link B2biServiceException}
 * <p>Base exception class for all service exceptions from B2bi service.</p>
 *
 * @public
 * @example Sample GetTransformer call
 * ```javascript
 * //
 * const input = {
 *   "transformerId": "tr-974c129999f84d8c9"
 * };
 * const command = new GetTransformerCommand(input);
 * const response = await client.send(command);
 * /* response ==
 * {
 *   "name": "transformJSON",
 *   "createdAt": "2023-11-01T21:51:05.504Z",
 *   "ediType": {
 *     "x12Details": {
 *       "version": "VERSION_4010",
 *       "transactionSet": "X12_110"
 *     }
 *   },
 *   "fileFormat": "JSON",
 *   "mappingTemplate": "$",
 *   "modifiedAt": "2023-11-01T21:51:05.504Z",
 *   "sampleDocument": "s3://test-bucket/sampleDoc.txt",
 *   "status": "inactive",
 *   "transformerArn": "arn:aws:b2bi:us-west-2:123456789012:transformer/tr-974c129999f84d8c9",
 *   "transformerId": "tr-974c129999f84d8c9"
 * }
 * *\/
 * // example id: example-1
 * ```
 *
 */
export class GetTransformerCommand extends $Command
  .classBuilder<
    GetTransformerCommandInput,
    GetTransformerCommandOutput,
    B2biClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >()
  .ep({
    ...commonParams,
  })
  .m(function (this: any, Command: any, cs: any, config: B2biClientResolvedConfig, o: any) {
    return [
      getSerdePlugin(config, this.serialize, this.deserialize),
      getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
  })
  .s("B2BI", "GetTransformer", {})
  .n("B2biClient", "GetTransformerCommand")
  .f(void 0, void 0)
  .ser(se_GetTransformerCommand)
  .de(de_GetTransformerCommand)
  .build() {}
