# TLS

`compio-tls` is an adaptor for `native-tls` and `rustls`. These crates require a stream type that implements `std::io::{Read, Write}`, so `compio::io::compat::SyncStream` is used.

The exposed `compio::tls::TlsStream` implements `compio::io::{AsyncRead, AsyncWrite}`.

It should be noticed that `native-tls` doesn't support QUIC. If you use `compio-quic`, `rustls` is inevitably imported.
