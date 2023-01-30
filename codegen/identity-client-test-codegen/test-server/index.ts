import express from "express";

import { Service_sigV4AndHttpBearerAuth } from "../build/smithyprojections/identity-client-test-codegen/sigV4AndHttpBearerAuth/typescript-codegen/src/Service_sigV4AndHttpBearerAuth";

(async () => {
  console.time();
  // Create test service
  const app = express();
  const port = 3000;
  app.get("/echo", (req, res) => {
    res.json({});
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  // Create client
  const client = new Service_sigV4AndHttpBearerAuth({
    endpoint: `http://localhost:${port}`,
    credentials: {
      accessKeyId: "accessKeyId",
      secretAccessKey: "secretAccessKey",
    },
    token: {
      token: "token",
    },
    region: "us-west-2",
  });
  console.log(client.middlewareStack.identify());

  // Call test service with client
  console.log(await client.echo({}));

  // Close test service
  process.exit(0);
})();
