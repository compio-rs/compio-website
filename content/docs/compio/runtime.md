# Runtime

`compio-runtime` provides a single-threaded async runtime. There may be many `compio::runtime::Runtime`s in one thread, while the "current" runtime is the last one whose `block_on` has been called.

Users are recommended to use the proc macros provided by `compio-macros`:

```rust
#[compio::main]
async fn main() {
    // Use compio directly...
}
```

There is also macro `compio::test` for async tests.

The struct `Runtime` provides some low-level control APIs. They are used when users need to hook into the runtime to achieve their fancy features. `winio` uses these methods to create a GUI-compatible async runtime.

## Timers

A simple timer queue is implemented for timer and sleeping features. It may not be fine-tuned, and help is welcome.

## Events

`Event` was previously an anonymous pipe, and at that time, it was the only way to wake up the runtime. Now it is runtime-agnostic, and is still here for compatibility reasons.

## Attacher

`Attacher` is responsible for attaching the handles to the IOCP. You don't need it if you don't understand what it is for.
