import { RelativeMiddlewareOptions } from "@aws-sdk/types";

import { authMiddleware } from "./utils/authMiddleware";

export const AwsAuthMiddlewareOptions: RelativeMiddlewareOptions = {
  name: "awsAuthMiddleware",
  tags: ["SIGNATURE", "AWSAUTH"],
  relation: "after",
  toMiddleware: "retryMiddleware",
  override: true,
};

export const awsAuthMiddleware = authMiddleware;
