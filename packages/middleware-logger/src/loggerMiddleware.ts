import {
  AbsoluteLocation,
  HandlerExecutionContext,
  InitializeHandler,
  InitializeHandlerArguments,
  InitializeHandlerOptions,
  InitializeHandlerOutput,
  Logger,
  MetadataBearer,
  Pluggable,
} from "@smithy/types";

/**
 * @internal
 */
export interface LoggerMiddlewareHandlerExecutionContext {
  /**
   * A logger that may be invoked by any handler during execution of an
   * operation.
   */
  logger?: Logger;

  /**
   * Name of the service.
   */
  clientName?: string;

  /**
   * Name of the command.
   */
  commandName?: string;

  /**
   * Function that filters an input based on `@sensitive`
   * @param input input to filter
   */
  inputFilterSensitiveLog?(input: any): any;

  /**
   * Function that filters an output based on `@sensitive`
   * @param output output to filter
   */
  outputFilterSensitiveLog?(output: any): any;

  /**
   * Used by DynamoDbDocumentClient.
   */
  dynamoDbDocumentClientOptions?: Partial<{
    overrideInputFilterSensitiveLog(...args: any[]): string | void;
    overrideOutputFilterSensitiveLog(...args: any[]): string | void;
  }>;
}

export const loggerMiddleware =
  () =>
    <Output extends MetadataBearer = MetadataBearer>(
      next: InitializeHandler<any, Output>,
      context: LoggerMiddlewareHandlerExecutionContext
    ): InitializeHandler<any, Output> =>
      async (args: InitializeHandlerArguments<any>): Promise<InitializeHandlerOutput<Output>> => {
        try {
          const response = await next(args);
          const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;

          const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
          const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
          const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;

          const { $metadata, ...outputWithoutMetadata } = response.output;
          logger?.info?.({
            clientName,
            commandName,
            input: inputFilterSensitiveLog(args.input),
            output: outputFilterSensitiveLog(outputWithoutMetadata),
            metadata: $metadata,
          });
          return response;
        } catch (error) {
          const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;

          const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
          const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;

          logger?.error?.({
            clientName,
            commandName,
            input: inputFilterSensitiveLog(args.input),
            error,
            metadata: (error as any).$metadata,
          });
          throw error;
        }
      };

export const loggerMiddlewareOptions: InitializeHandlerOptions & AbsoluteLocation = {
  name: "loggerMiddleware",
  tags: ["LOGGER"],
  step: "initialize",
  override: true,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getLoggerPlugin = (options: any): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
  },
});
