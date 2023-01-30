$version: "2.0"

namespace aws.test

use smithy.api#httpApiKeyAuth
use smithy.api#httpBearerAuth

@httpBearerAuth
@httpApiKeyAuth(
    name: "api-key"
    in: "header"
)
service Service_httpBearerAuthAndHttpApiKeyAuth {
    operations: [
        Echo
    ]
}

operation Echo {
    input := {}
    output := {}
    errors: []
}
