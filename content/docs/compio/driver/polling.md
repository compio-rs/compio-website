# polling

`polling` crate is a subproject of `smol`. It provides a unified wrapper for the reactors on most platforms. Therefore, it is used on platforms other than Windows. On Linux, it is an option if io-uring is not available. When the user enables both `"io-uring"` and `"polling"`, a "fusion" driver is used and responsible for deciding which one to use in runtime.

Frankly, there is no real async operations in a reactor. The socket IO operations are non-blocking, but the data copying still takes time. The blocking operations are spawned to the thread pool.

## What about AIO?

The POSIX AIO is good, but generally cannot be used properly in `compio`. The POSIX standard leaves no way to interact the AIO operations with epoll or kqueue. Only FreeBSD provides such functionalities as extensions. As we don't have a FreeBSD CI, we don't have enough ability to add AIO support to `compio`.
