# A story of `compio`

Long, long time ago, there was a group "Rust 众". People there were interested in asynchronous programming, and the newest, hottest technology io-uring. They wondered if the most popular async runtime `tokio` could use this technology as the backend.

The `tokio` community had some trials, but the interface of `tokio-uring` was different from the original `tokio` one, for safety reasons. Traditionally, `tokio` is based on reactor model, while io-uring is a proactor. Proactor-based IO functions require the ownership of the buffers, a completely different API idiom from the current ones. Therefore, unless `tokio` is willing to release 2.0 for the breaking change, io-uring will never be a first class citizen for `tokio`.

Wait - IOCP on Windows is also a proactor, right? Yes, but no one really cares about that. Windows IOCP is neither newest nor hottest. It has been in the system kernel for 20 years. Before io-uring, it was the only proactor among the popular operating systems. Therefore, `tokio` decided to use the _undocumented_ AFD driver, which is a satisfying reactor.

Now io-uring is here. Unexpectedly, the greatest open source operating system chooses proactor. Let's find an async runtime that uses io-uring correctly and be cross-platform. Unfortunately, there's none. Rust's `Future` encourages poll-based API by design, because it assumes that the underlying runtime won't do anything when `Future::poll` is not called. We need to ignore that assumption to wrap proactor APIs.

That's when Berrysoft came up with the idea: if there is no such runtime, why cannot I author one? He started with `tokio-iocp` crate (don't use it please). It was a failure, because `tokio` refused to expose `mio` interfaces, and he ended up with a runtime that consumed CPU 100% even there were no tasks to operate. However, with the experience and lessons from the failure, he believed that he had the ability to author a new one.

He started with a runtime based on IOCP. It should contain a struct `File` to read and write the files. Then it was ported to Linux based on io-uring. The API of IOCP and io-uring differs, but their natures are the same. The API of the new runtime imitated `tokio` and `monoio`. When the first example ran correctly on both Windows and Linux, he was very excited. He shared the new runtime to the chat group. Since then, no one in the group ever dreamed of `tokio` 2.0.

Berrysoft gave this new runtime the name "compio", which means completion-based IO. It should be pronounced like /'kɔmpaio/ or /'kɔmpio/. The name follows the non-existent convention that an async runtime should be named with a suffix "io". Later, he also designed a logo for it. It is a letter "C" with a plug inside, which means that it is a "socket".

As the project developed, more people showed interest in it. Thanks to @George-Miao (Pop)'s so many efforts on `compio`. He is a better developer and reviewer than me. When Berrysoft introduced the runtime in the group, he noticed it and decided to port it to Mac. It was not an easy job, because there is no proactor on Mac. He had to simulate a proactor with a reactor. After his success, the structure of `compio-driver` was finally established.

`compio` had few users at first. It only provided mid-level interfaces, e.g., TCP streams. If there were an HTTP client based on `compio`, it would be easier for newcomers to try `compio`. With that in mind, he started to author `compio-http`, and finally it became `cyper`. `cyper` is based on `compio` and `hyper`, providing HTTP client in `cyper` crate, and `axum` adapters in `cyper-axum`.

Before April Fools of 2024, he decided to make some big news. He found that the natures of an async runtime and a GUI framework are the same. Therefore, it should be possible to write a GUI async runtime, in which IO operations and GUI coexist in one thread without blocking each other. He started with another new runtime, copying code from `compio`, and added some other stuff to handle the message queue on Windows. It worked like a charm. Then he exposed some low-level API from `compio-runtime` to make the GUI runtime use `compio` directly. The crate was finally ported to GTK & Qt on Linux, and Cocoa on Mac. He called it `winio`, because it was originally a Windows-IO runtime. `winio` _was_ an April Fools' joke, but now it's a serious project, a cross-platform native GUI async framework.

The compio project is Berrysoft's largest project up to now. He has spent a lot on it, dreaming it becoming an alternative to `tokio`. It's OK if the dream doesn't come true but, at least, he hopes `compio` to be a good experimental project for everyone who is interested in exploring new programming paradigms.

Thank you all the maintainers and supporters. The project wouldn't be here without your help.

---

Berrysoft, Oct. 2024
