$version: "2.0"

namespace aws.test

use smithy.api#httpApiKeyAuth

@httpApiKeyAuth(
    name: "api-key"
    in: "header"
)
service Service_httpApiKeyAuthWithScheme {
    operations: [
        Echo
    ]
}

operation Echo {
    input := {}
    output := {}
    errors: []
}
