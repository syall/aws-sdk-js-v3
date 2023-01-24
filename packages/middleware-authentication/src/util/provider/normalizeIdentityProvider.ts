import { memoize } from "@aws-sdk/property-provider";
import { Identity, IdentityProvider, MemoizedProvider } from "@aws-sdk/types";
import { normalizeProvider } from "@aws-sdk/util-middleware";

const CREDENTIAL_EXPIRE_WINDOW = 300_000;

const isIdentityWithExpiry = (identity: Identity) => identity.expiration !== undefined;
const isIdentityExpiringWithinFiveMins = (identity: Identity) =>
  isIdentityWithExpiry(identity) && identity.expiration!.getTime() - Date.now() < CREDENTIAL_EXPIRE_WINDOW;

/**
 * TODO(identityandauth)
 */
export const normalizeIdentityProvider = (
  identity: Identity | IdentityProvider<Identity>
): MemoizedProvider<Identity> => {
  if (typeof identity === "function") {
    return memoize(identity, isIdentityExpiringWithinFiveMins, isIdentityWithExpiry);
  }
  return normalizeProvider(identity);
};
