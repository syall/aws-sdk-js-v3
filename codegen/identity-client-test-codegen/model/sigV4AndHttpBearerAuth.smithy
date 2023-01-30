$version: "2.0"

namespace aws.test

use aws.auth#sigv4
use smithy.api#httpBearerAuth
use aws.protocols#restJson1

@sigv4(
    name: "sig-v4-and-http-bearer-auth-service"
)
@httpBearerAuth
@restJson1
service Service_sigV4AndHttpBearerAuth {
    operations: [
        Echo
    ]
}

@http(code: 200, method: "GET", uri: "/echo")
operation Echo {
    input: EchoInput
    output: EchoOutput
    errors: []
}

@input
structure EchoInput {}

@output
structure EchoOutput {}
