# Dispatcher

`compio::dispatcher::Dispatcher` is a simple dispatcher that manages multiple runtimes on multiple threads. The runtimes share the same thread pool. It is useful when you want to dispatch the worker tasks to different threads, for example, a web server.

```rust
const THREAD_NUM: usize = 5;
const CLIENT_NUM: usize = 10;

// Create a listener.
let listener = TcpListener::bind("127.0.0.1:0").await.unwrap();
// Create a dispatcher.
let dispatcher = Dispatcher::builder()
    .worker_threads(NonZeroUsize::new(THREAD_NUM).unwrap())
    .build()
    .unwrap();
// Handles of all dispatched tasks.
let mut handles = FuturesUnordered::new();
for _i in 0..CLIENT_NUM {
    // Accept a client.
    let (client, _) = listener.accept().await.unwrap();
    let handle = dispatcher
        .dispatch(move || async move {
            // Deal with the client...
        })
        .unwrap();
    handles.push(handle);
}
while handles.next().await.is_some() {}
dispatcher.join().await.unwrap();
```

## An optional solution
The dispatcher is not the only solution to multithreading web servers. `SO_REUSEADDR`(`SocketOpts::reuse_address`) or `SO_REUSEPORT`(`SocketOpts::reuse_port`) might be more efficient.
