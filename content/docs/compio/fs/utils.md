# Utils

## Pipe-like asynchronous FD

`AsyncFd` provides general methods for a pipe-like file, e.g., a socket. Users may find it helpful when wrapping their own pipes or sockets.

## Metadata

They are especially needed on Linux, because io-uring provides `statx` operation.

Note that the metadata related methods of `std::path::Path` still calls the `std` ones. It is not the responsibility of `compio`.

## File and directory operations

Some methods are provided as the async version of the `std` ones.
