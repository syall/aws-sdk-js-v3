import { AwsCredentialIdentity, Identity } from "./identity";
import { Provider } from "./util";

/**
 * An object representing temporary or permanent AWS credentials.
 *
 * @deprecated Use {@AwsCredentialIdentity}
 */
export interface Credentials extends AwsCredentialIdentity {
  /**
   * AWS access key ID
   */
  readonly accessKeyId: string;

  /**
   * AWS secret access key
   */
  readonly secretAccessKey: string;

  /**
   * A security or session token to use with these credentials. Usually
   * present for temporary credentials.
   */
  readonly sessionToken?: string;
}

/**
 * @deprecated Use {@AwsCredentialIdentityProvider}
 */
type CredentialProvider = Provider<Credentials>;
