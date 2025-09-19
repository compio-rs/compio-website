# Ready-based socket

`PollFd` provides a thin wrapper of a socket, and exposes `*_ready` methods.

The wrapper uses `WSAEventSelect` on Windows. A better solution may be `ProcessSocketNotifications`, but `compio-driver` would need to be modified to adapt to that. Help is needed to improve this feature.
