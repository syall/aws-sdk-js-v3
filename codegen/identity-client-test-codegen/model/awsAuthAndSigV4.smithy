$version: "2.0"

namespace aws.test

use aws.api#service
use aws.auth#sigv4

@service(
    sdkId: "awsAuthAndSigV4"
    arnNamespace: "aws-auth-and-sig-v4-service"
    cloudTrailEventSource: "aws-auth-and-sig-v4-service.amazonaws.com"
)
@sigv4(
    name: "aws-auth-and-sig-v4-service"
)
service Service_awsAuthAndSigV4 {
    operations: [
        Echo
    ]
}

operation Echo {
    input := {}
    output := {}
    errors: []
}
