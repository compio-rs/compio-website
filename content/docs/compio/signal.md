# Signal

`compio-signal` provides functionalities for waiting for signals. It is common to handle the Ctrl-C event:

```rust
use futures_util::FutureExt;

let mut interval = compio::time::interval(Duration::from_secs(2));
loop {
    let mut ctrlc = compio::signal::ctrl_c();
    let ctrlc = std::pin::pin!(ctrlc);
    futures_util::select! {
        res = ctrlc.fuse() => {
            res.unwrap();
            println!("break");
            break;
        },
        _ = interval.tick().fuse() => println!("ping"),
    }
}
```

## "Signals" on Windows

There is no "signals" on Windows. Instead, they are "ctrl handlers" here. There are only 5 such events, including Ctrl-C event.

## Signal handling on Linux

It is different on Linux from other Unix systems. The handled signals are masked by `pthread_sigmask`, which is a thread-wide method. So that we can use "signalfd" to simplify the code.
