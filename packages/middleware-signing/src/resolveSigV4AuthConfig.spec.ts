import { HttpRequest } from "@aws-sdk/protocol-http";

import { resolveSigV4AuthConfig } from "./resolveSigV4AuthConfig";

describe(resolveSigV4AuthConfig.name, () => {
  const authScheme = {
    name: "sigv4",
    signingRegion: "UNIT_TEST_REGION",
    signingName: "UNIT_TEST_SERVICE_NAME",
    properties: {},
  };

  const inputParams = {
    credentialDefaultProvider: () => () => Promise.resolve({ accessKeyId: "key", secretAccessKey: "secret" }),
    region: jest.fn().mockImplementation(() => Promise.resolve("us-foo-1")),
    signingName: "foo",
    sha256: jest.fn().mockReturnValue({
      update: jest.fn(),
      digest: jest.fn().mockReturnValue("SHA256 hash"),
    }),
    credentials: jest.fn().mockResolvedValue({ accessKeyId: "key", secretAccessKey: "secret" }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should memoize custom credential provider", async () => {
    const { signer: signerProvider } = resolveSigV4AuthConfig(inputParams);
    const signer = await signerProvider(authScheme);
    const request = new HttpRequest({});
    const repeats = 10;
    for (let i = 0; i < repeats; i++) {
      await signer.sign(request);
    }
    expect(inputParams.credentials).toBeCalledTimes(1);
  });

  it("should refresh custom credential provider if expired", async () => {
    const FOUR_MINUTES_AND_59_SEC = 299 * 1000;
    const input = {
      ...inputParams,
      credentials: jest
        .fn()
        .mockResolvedValueOnce({
          accessKeyId: "key",
          secretAccessKey: "secret",
          expiration: new Date(Date.now() + FOUR_MINUTES_AND_59_SEC),
        })
        .mockResolvedValue({ accessKeyId: "key", secretAccessKey: "secret" }),
    };
    const { signer: signerProvider } = resolveSigV4AuthConfig(input);
    const signer = await signerProvider(authScheme);
    const request = new HttpRequest({});
    const repeats = 10;
    for (let i = 0; i < repeats; i++) {
      await signer.sign(request);
    }
    expect(input.credentials).toBeCalledTimes(2);
  });
});
