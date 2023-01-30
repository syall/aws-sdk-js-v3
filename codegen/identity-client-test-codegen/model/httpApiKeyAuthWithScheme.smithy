$version: "2.0"

namespace aws.test

use smithy.api#httpApiKeyAuth

@httpApiKeyAuth(
    name: "api-key"
    in: "header"
    scheme: "something"
)
service Service_httpApiKeyAuth {
    operations: [
        Echo
    ]
}

operation Echo {
    input := {}
    output := {}
    errors: []
}
