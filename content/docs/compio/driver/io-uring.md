# io-uring

The io-uring driver requires a Linux 5.15+ kernel. The kernel version limitation is from the oldest supported Ubuntu version.

Some operations require a newer kernel, so they are hidden behind feature gates.

| feature           | description                                        |
| ----------------- | -------------------------------------------------- |
| `io-uring-socket` | Create sockets in io-uring instead of thread pool. |
| `io-uring-cqe32`  | Enable large completion queue entry                |
| `io-uring-sqe128` | Enable large submission queue entry                |

If a feature is enabled but the kernel doesn't support it, the behavior depends on whether `polling` feature is also enabled. If `polling` is not enabled, the driver will continue using io-uring regardless of the kernel support. Or `polling` will be used as a fallback.

As io-uring is a bounded ring, possibly there is a case that the queues are full. The kernel is responsible to decide whether to discard the entries or report it to the user.
