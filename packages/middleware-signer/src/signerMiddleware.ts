import { HttpRequest } from "@smithy/protocol-http";
import {
  FinalizeRequestMiddleware,
  FinalizeHandler,
  FinalizeHandlerArguments,
  FinalizeHandlerOutput,
  SelectedAuthScheme,
  SMITHY_SDK_INTERNAL,
  RelativeMiddlewareOptions
} from "@smithy/types";
import { SignerHandlerExecutionContext, SignerResolvedConfig } from "./configuration";

export const signerMiddlewareOptions: RelativeMiddlewareOptions = {
  name: "signerMiddleware",
  relation: "after",
  toMiddleware: "retryMiddleware",
  override: true,
};

export const signerMiddleware =
  <Input extends object, Output extends object>(
    options: SignerResolvedConfig
  ): FinalizeRequestMiddleware<Input, Output> =>
    (next: FinalizeHandler<Input, Output>, context: SignerHandlerExecutionContext): FinalizeHandler<Input, Output> =>
      async function (args: FinalizeHandlerArguments<Input>): Promise<FinalizeHandlerOutput<Output>> {
        if (!HttpRequest.isInstance(args.request)) {
          return next(args);
        }

        const { signer, identity, authOption }: SelectedAuthScheme =
          context[SMITHY_SDK_INTERNAL]!.selectedAuthScheme!;
        const signedRequest = signer.sign(
          args.request,
          identity,
          authOption!.signerProperties || {});

        return next({
          ...args,
          request: signedRequest,
        });
      };
