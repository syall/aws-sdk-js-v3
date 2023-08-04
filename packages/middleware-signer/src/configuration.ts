import {
    SelectedAuthScheme,
    HandlerExecutionContext,
    SMITHY_SDK_INTERNAL,
  } from "@smithy/types";
  
  export interface SignerResolvedConfig { }

  export interface SignerHandlerExecutionContext extends HandlerExecutionContext {
    [SMITHY_SDK_INTERNAL]?: {
      selectedAuthScheme?: SelectedAuthScheme;
    }
  }
  