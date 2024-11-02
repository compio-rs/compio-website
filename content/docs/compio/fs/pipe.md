# Pipe

Pipes are platform-specific.

## Named pipes on Windows

Anonymous pipes on Windows are derived from named pipes, and they don't support "overlapped" operations. Therefore, only named pipes are provided in `compio::fs::named_pipe`. The APIs imitate the ones in `tokio`.

All named pipes' path should be prefixed with `\\.\pipe\`. It is a UNC path, and could not be found on the disks.

Named pipes on Windows are duplex. Both the pipe server and client could perform read & write operations.

## Pipes on Unix

Anonymous pipes and named pipes are different kinds of files. Named pipes are also called "FIFO" files, and could be created by `nix::unistd::mkfifo`.

Pipes on Unix are one-way streams, either sender or receiver. To achieve duplex communication, either to create two pairs of pipes, or to create a pair of anonymous Unix domain sockets.
