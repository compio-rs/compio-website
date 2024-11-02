# Sockets

TCP & Unix sockets are streams, while `UdpSocket` is a datagram socket.

TCP sockets and Unix domain sockets are very much alike. The code for TCP sockets should work also for Unix sockets.

`TcpListener` is a listener, binds to a socket address, and listens for incoming client connections. Calling to `TcpListener::accept` receives a new connection, and returns the created `TcpStream` for the connection, and the peer address.

A client could simply use `TcpStream::conect` to connect the remote listener.

See the introduction of [`File::close`](../fs/file.md) for closing the sockets.

## Dual-stack support

Windows supports dual-stack IPv6 & IPv4, but it is not enabled by default. You need to enable it manually, after creating the socket, and before binding to an address, calling Windows API your self, if needed.

## Unix sockets on Windows

Windows _does_ support Unix sockets, with some limitations. A Unix socket on Windows can only bind or connect to a path. When a `UnixStream` connects to a path, the local address may be unnamed. There is no abstract address support, so there is no `socketpair` on Windows.

## Control messages of UDP sockets

TODO
