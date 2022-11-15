import { Identity, IdentityProvider } from "./Identity";

// TODO(syall): Add comments / export
export interface LoginIdentity extends Identity {
  readonly username: string;
  readonly password: string;
}

type LoginIdentityProvider = IdentityProvider<LoginIdentity>;
