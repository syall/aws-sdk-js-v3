$version: "2.0"

namespace aws.test

use smithy.api#httpApiKeyAuth
use smithy.api#httpBearerAuth
use smithy.api#auth

@httpBearerAuth
@httpApiKeyAuth(
    name: "api-key"
    in: "header"
)
@auth([httpBearerAuth, httpApiKeyAuth])
service Service_httpBearerAuthAndHttpApiKeyAuthAndAuth {
    operations: [
        Echo
    ]
}

operation Echo {
    input := {}
    output := {}
    errors: []
}
