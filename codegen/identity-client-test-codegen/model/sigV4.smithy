$version: "2.0"

namespace aws.test

use aws.auth#sigv4

@sigv4(
    name: "sig-v4-service"
)
service Service_sigV4 {
    operations: [
        Echo
    ]
}

operation Echo {
    input := {}
    output := {}
    errors: []
}
