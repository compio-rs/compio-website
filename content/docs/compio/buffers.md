# Buffers

Crate `compio-buf` is fundamental to `compio`. It provides abstractions for different buffers and IO operations.

## Buffer traits

The trait `IoBuf` is the abstract of read-only buffers. Trait `IoBufMut` provides writing methods in addition. It allows you to extend the buffer via explicit APIs, but I/O write operations themselves can only write into the already-allocated space and will not automatically grow the underlying vector.

`IoBuf` & `IoBufMut` represent owned buffers. The IO operations always require the ownership of a buffer to avoid potential race conditions. Although the traits implement for arrays `[u8; N]`, it's not a good idea to use them as buffer type, because the move operation of them is relatively slow. Use `Vec<u8>` or `Box<[u8]>` instead.

## Slicing

Sometimes an owned slice of the buffer is needed. `IoBuf::slice` provides such convenience. It creates a slice which owns the buffer, and the buffer could be retrieved by `<Slice as IntoInner>::into_inner`. `IoBufMut::uninit` provides similar functionalities, but it exposes only the uninitialized part of the buffer.

## Vectored buffers

Traits `IoVectoredBuf` and `IoVectoredBufMut` provide abstractions for vectored read-only buffers and vectored mutable buffers. They are used in `write_vectored` and `read_vectored` like operations. Just like the single buffer traits, they also require the ownership of the buffers.

## IO results with buffer

Type `BufResult` is a specialized return type for IO operations. It contains a usual `std::io::Result`, with a buffer the user passed to the operation when calling. It provides some common methods like `Result`, and implements `try_trait_v2` series traits.

In stable code, the question mark `?` could not be used. Instead, a macro `buf_try!` is provided:

```rust
fn foo<T>(buf: T) -> BufResult<(), T> {
    let (a, buf) = buf_try!(BufResult(Ok(114), buf));
    BufResult(Ok(()), buf)
}
fn bar() -> std::io::Result<()> {
    let (a, b) = buf_try!(@try BufResult(Ok(114), 514));
    Ok(())
}
```

While the `"nightly"` feature is enabled:

```rust
fn foo<T>(buf: T) -> BufResult<(), T> {
    let (a, buf) = BufResult(Ok(114), buf)?;
    BufResult(Ok(()), buf)
}
fn bar() -> std::io::Result<()> {
    let (a, b) = BufResult(Ok(114), 514)?;
    Ok(())
}
```

In function `bar`, when the result is `Err`, the buffer (here is the number `514`) will be discarded.
