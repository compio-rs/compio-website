# Networking

`compio-net` provides most networking affairs. TCP, UDP, Unix sockets are supported. The TLS support is in `compio-tls`, the QUIC support is in `compio-quic`, and the WebSocket support is in `compio-ws`. For high level HTTP support, see `cyper`.

Sockets in `compio` expose completion-based APIs. If it is too confusing to use, `PollFd` is provided for all kinds of socket resources, and exposes ready-based APIs.
