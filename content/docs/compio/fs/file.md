# File

`File` represents a regular file. The file may be located on a local disk, or on a remote server. Thus, it is essential to make `File::open` and `File::create` asynchronous.

Section [IO](../io) introduces the `*At*` traits, which are implemented by `File`. Although `AsyncWriteAt` requires `&mut self`, it also implements for `&File`. It is unspecified behavior to pass `u64::MAX` as the offset. The result is not ensured to be consistent.

When `polling` driver is enabled, the file operations are all spawned to a thread pool.

`File::close` waits for all pending and processing operations of this file to complete. It is safe to drop the `File` directly if you wouldn't like to wait, and the FD will not be dropped immediately.
