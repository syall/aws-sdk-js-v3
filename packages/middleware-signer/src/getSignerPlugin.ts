import { Pluggable } from "@smithy/types";
import { signerMiddleware, signerMiddlewareOptions } from "./signerMiddleware";

export const getSignerPlugin = (config: object): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(signerMiddleware(config), signerMiddlewareOptions);
  },
});
