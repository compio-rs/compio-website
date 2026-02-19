# io-uring

Some operations require a newer kernel, so they are hidden behind feature gates.

| feature           | description                         |
| ----------------- | ----------------------------------- |
| `io-uring-cqe32`  | Enable large completion queue entry |
| `io-uring-sqe128` | Enable large submission queue entry |

If the kernel doesn't support these features, the driver will not fallback to the polling driver.

If the kernel doesn't support the opcode to be submitted, the driver will fallback to a blocking operation.

As io-uring is a bounded ring, possibly there is a case that the queues are full. The kernel is responsible to decide whether to discard the entries or report it to the user.
