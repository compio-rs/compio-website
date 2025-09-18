# Driver

`compio-driver` provides 3 kinds of drivers, currently. On Windows, the IOCP driver is selected. On Linux, users can decide whether to use io-uring or epoll (powered by `polling`), or let the crate decide itself. For other circumstances, a reactor driver powered by `polling` is used. The driver type could be retrieved dynamically by `compio::driver::Proactor::driver_type`.

Unless you want to write your own runtime based on a low level proactor, using `compio-driver` directly is not a good choice. The examples of `compio` _do_ provide an example using `compio-driver` directly, dealing with platform differences themselves.

## Operations

The crate itself exposes low-level proactor API. There have been already some wrapped operations, called `OpCode`. The interface of operations may differ for different platforms and drivers.

Note that currently the `OpCode`s are boxed inside the drivers. The allocation could not be avoided, because we need to erase the different types of buffers.

## Thread pools

Different drivers support different kinds of operations. For example, the polling driver doesn't support async file IO. Therefore, the file operations in polling driver are actually spawned into a thread pool.

There is a limitation on the number of threads in the thread pool. The limitation could be modified manually when creating the `Proactor`. If the number of threads exceeds the limitation, the operation may fail immediately.

## Cancellation

The `Proactor` provides a simple cancellation mechanism. The cancellation of an operation may succeed or fail. The cancellation behavior may differ by drivers.

## Shared FDs

"File descriptors" in `compio` represents the file descriptors on Unix and handles on Windows. When the driver is holding the operations, it should also hold the reference of the related fds. Therefore, all fds are wrapped inside an `Arc`. When a file or socket is cloned, the inner `Arc` is cloned, rather than duplicating (e.g., with `dup`) the fds or handles. When the method `close` is called on a file or socket, the future will wait for all related operations to complete. Therefore, it's not a good idea to close a cloned file or socket.
