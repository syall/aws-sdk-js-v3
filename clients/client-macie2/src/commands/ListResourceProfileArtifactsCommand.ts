// smithy-typescript generated code
import { EndpointParameterInstructions, getEndpointPlugin } from "@aws-sdk/middleware-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  MiddlewareStack,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

import { Macie2ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Macie2Client";
import {
  ListResourceProfileArtifactsRequest,
  ListResourceProfileArtifactsRequestFilterSensitiveLog,
  ListResourceProfileArtifactsResponse,
  ListResourceProfileArtifactsResponseFilterSensitiveLog,
} from "../models/models_1";
import {
  deserializeAws_restJson1ListResourceProfileArtifactsCommand,
  serializeAws_restJson1ListResourceProfileArtifactsCommand,
} from "../protocols/Aws_restJson1";

export interface ListResourceProfileArtifactsCommandInput extends ListResourceProfileArtifactsRequest {}
export interface ListResourceProfileArtifactsCommandOutput
  extends ListResourceProfileArtifactsResponse,
    __MetadataBearer {}

/**
 * <p>Retrieves information about objects that were selected from an S3 bucket for automated sensitive data discovery.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Macie2Client, ListResourceProfileArtifactsCommand } from "@aws-sdk/client-macie2"; // ES Modules import
 * // const { Macie2Client, ListResourceProfileArtifactsCommand } = require("@aws-sdk/client-macie2"); // CommonJS import
 * const client = new Macie2Client(config);
 * const command = new ListResourceProfileArtifactsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListResourceProfileArtifactsCommandInput} for command's `input` shape.
 * @see {@link ListResourceProfileArtifactsCommandOutput} for command's `response` shape.
 * @see {@link Macie2ClientResolvedConfig | config} for Macie2Client's `config` shape.
 *
 */
export class ListResourceProfileArtifactsCommand extends $Command<
  ListResourceProfileArtifactsCommandInput,
  ListResourceProfileArtifactsCommandOutput,
  Macie2ClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  public static getEndpointParameterInstructions(): EndpointParameterInstructions {
    return {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
    };
  }

  constructor(readonly input: ListResourceProfileArtifactsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: Macie2ClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListResourceProfileArtifactsCommandInput, ListResourceProfileArtifactsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, ListResourceProfileArtifactsCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "Macie2Client";
    const commandName = "ListResourceProfileArtifactsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListResourceProfileArtifactsRequestFilterSensitiveLog,
      outputFilterSensitiveLog: ListResourceProfileArtifactsResponseFilterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListResourceProfileArtifactsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1ListResourceProfileArtifactsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ListResourceProfileArtifactsCommandOutput> {
    return deserializeAws_restJson1ListResourceProfileArtifactsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
