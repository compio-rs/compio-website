# polling

`polling` crate is a subproject of `smol`. It provides a unified wrapper for the reactors on most platforms. Therefore, it is used on platforms other than Windows. On Linux, it is an option if io-uring is not available. When the user enables both `"io-uring"` and `"polling"`, a "fusion" driver is used and responsible for deciding which one to use at runtime. You are able to specify the exact driver to use with the `ProactorBuilder`.

Frankly, there is no real async operations in a reactor. The socket IO operations are non-blocking, but the data copying still takes time. The blocking operations are spawned to the thread pool.

## What about AIO?

The POSIX standard leaves no way to interact the AIO operations with polling interfaces.

### FreeBSD

FreeBSD provides extensions to post AIO events to kqueue. There are some known issues:
* Some filesystems don't support AIO. `compio` fallbacks to blocking call if the AIO method returns `EOPNOTSUPP`.
* The process-wide AIO queue is limited. If the queue is full, users cannot add new AIO requests unless one control block is removed by `aio_return`. In that case, `compio` fallbacks to blocking call.

### Illumos & Solaris

Solarish systems provides extensions to post AIO events to an event port. However, it doesn't support `aio_readv` or `aio_writev`. Therefore, `compio` fallbacks to `aio_read` & `aio_write` for files on solarish systems.
