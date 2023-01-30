$version: "2.0"

namespace aws.test

use smithy.api#httpBearerAuth

@httpBearerAuth
service Service_httpBearerAuth {
    operations: [
        Echo
    ]
}

operation Echo {
    input := {}
    output := {}
    errors: []
}
