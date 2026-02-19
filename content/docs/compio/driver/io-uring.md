# io-uring

Some operations require a newer kernel, so they are hidden behind feature gates.

| feature           | description                         |
| ----------------- | ----------------------------------- |
| `io-uring-cqe32`  | Enable large completion queue entry |
| `io-uring-sqe128` | Enable large submission queue entry |

If the kernel doesn't support these feature-gated capabilities, the io-uring driver will fail to create. If `"polling"` feature is also enabled, it will fallback to the polling driver.

If, for a particular operation, the kernel doesn't support the opcode being submitted, that operation will fall back to a blocking system call, while other io-uring operations continue as normal.

As io-uring is a bounded ring, possibly there is a case that the queues are full. The kernel is responsible to decide whether to discard the entries or report it to the user.
