# IOCP

IO completion ports is the most recommended async mechanism on Windows. The completion port is a multiple-producer channel, while the consumer could be single or multiple. In `compio-driver`, we only treat it as a single-consumer channel.

Each "overlapped" operations are submitted to kernel. The kernel is responsible for waiting them, and post the result to the port after the operation completes. The "overlapped" operations could be cancelled, but the cancellation may not be successful.

## Attaching

IOCP needs "attaching". Each file or socket handle needs to be associated to only one port. The association could be performed only once in documented APIs, while in undocumented APIs, the port could be changed, but the kernel doesn't ensure safety.

The mechanism forces the users "binding" the IO resources to a single async runtime, which is sometimes not that satisfying. A driver checks if the received result belongs to the IO resource attached to itself, and if not, it will try to post the result to the correct port. Another solution is the `"iocp-global"` feature. The feature spawns a separate thread running the global IOCP. All IO resources are attached to the global IOCP, and this separate thread is responsible for dispatching the results to each driver. Note that this feature may lead to larger overhead.

## Event objects

There are generally three ways to deal with event objects together with IOCP. We choose the documented way, the thread pool API. It is another thread pool maintained by kernel, and could handle more than 63 event objects easily.

We are aware of the fact that the thread pool API is powered by the undocumented API `NtAssociateWaitCompletionPacket`. It could be enabled by `"iocp-wait-packet"` feature.
