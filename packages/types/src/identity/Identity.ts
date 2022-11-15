// TODO(syall): Add comments / export
export interface Identity {
  /**
   * A {Date} when the identity or credential will no longer be accepted.
   */
  readonly expiration?: Date;
}

export type IdentityProvider<IdentityT extends Identity> = {
  (identityProperties?: Record<string, any>): Promise<IdentityT>;
};
