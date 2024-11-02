# Ready-based socket

`PollFd` provides thin wrapper of a socket, and exposes `*_ready` methods.

The wrapper uses `WSAEventSelect` on Windows. A better solution may be `ProcessSocketNotifications`, but `compio-driver` should also be modified to adapt that. Helps are needed to improve this feature.
