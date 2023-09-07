import { Pluggable } from "@smithy/types";

import { S3ControlResolvedConfig } from "../configurations";
import { parseOutpostArnablesMiddleware, parseOutpostArnablesMiddlewareOptions } from "./parse-outpost-arnables";
import { updateArnablesRequestMiddleware, updateArnablesRequestMiddlewareOptions } from "./update-arnables-request";

export const getProcessArnablesPlugin = (options: S3ControlResolvedConfig): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(parseOutpostArnablesMiddleware(options), parseOutpostArnablesMiddlewareOptions);
    clientStack.add(updateArnablesRequestMiddleware(options), updateArnablesRequestMiddlewareOptions);
  },
});
