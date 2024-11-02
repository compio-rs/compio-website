# HTTP client

Crate `cyper` contains the HTTP client. It imitates the API of `reqwest`, with some changes based on my interest.

## Implemented features

- TLS
- HTTP 2
- HTTP 3 (powered by `compio-quic`)
- Cookies
- Charset
- `serde`

## HTTP 3 upgrade

It is non-trivial to upgrade from HTTP 1/2 to HTTP 3, because they use different transformation protocols. `cyper` understands the `AltSvc` header of the responses, and upgrades to HTTP 3 as it indicates. This functionality is behind `http3-altsvc` feature gate.

To force HTTP 3, the best way is to change the `version` field of the `Request`.

## Certificates for `rustls`

`cyper` uses `rustls-platform-verifier` as the certificate provider and verifier, if `rustls` is enabled. This verifier needs [additional configuration](https://github.com/rustls/rustls-platform-verifier?tab=readme-ov-file#android) on Android.
