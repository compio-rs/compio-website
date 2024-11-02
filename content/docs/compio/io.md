# IO

`compio-io` provides runtime-agnostic utilities for completion-based IO. Most of them share the same name as the ones in `tokio` or `futures`, but the API may differ.

## Read & write

`AsyncRead` & `AsyncWrite` provides abstracts for basic read & write operations. The APIs require ownership of the buffer. Therefore, for a blocking sync program

```rust
let mut buffer = vec![0u8; 1024];
let read_len = socket.read(&mut buffer).await.unwrap();
```

The equivalent code in `compio` should be

```rust
let buffer = vec![0u8; 1024];
let (read_len, buffer) = socket.read(buffer).await.unwrap();
```

Note that the `compio` one uses trait `IoBufMut` as the input constraint, so the buffer could be uninitialized:

```rust
let buffer = Vec::with_capacity(1024);
let (read_len, buffer) = socket.read(buffer).await.unwrap();
assert_eq!(read_len, buffer.len());
```

`AsyncReadAt` & `AsyncWriteAt` is another story. Different from socket, files could be operated in parallel. There should be no problem to read and write a file simultaneously if the operation areas don't overlap. In addition, on Windows, the asynchronous file handle should specify the offset explicitly in read & write operations. There is no "file pointer" inside the async file handle. So these `*At*` traits are mainly designed for files. If you don't want to deal with the position directly, it would be a good choice to wrap the type inside `std::io::Cursor`.

## Buffered IO

`compio-io` also provides buffered reader & writer. A notable issue is that the read or write operations could not be cancelled by simply dropping them. The inner buffer may have transferred the ownership to the driver. Were the future dropped, the buffer would never come back.

## Compatible helpers

Mod `compio::io::compat` provides `SyncStream` and `AsyncStream` for compatibility usages. `SyncStream` implements `std::io::{Read, Write}`, and will return error with `WouldBlock` if the inner buffer should be updated manually. `AsyncStream` wraps `SyncStream` and implements `AsyncRead` & `AsyncWrite` of `futures`.
