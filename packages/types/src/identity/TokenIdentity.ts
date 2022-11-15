import { Identity } from "./Identity";

// TODO(syall): Add comments / export
export interface TokenIdentity extends Identity {
  /**
   *The literal token string
   */
  readonly token: string;
}

type TokenIdentityProvider = IdentityProvider<TokenIdentity>;
