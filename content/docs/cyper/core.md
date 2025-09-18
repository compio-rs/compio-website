# Cyper Core

The cyper project starts by `compio-http`. However, it is massive to maintain a `hyper` adaptor crate inside `compio` repo, so it is moved to a new repo. The name `cyper` comes from the combination of `compio` and `hyper`, and it sounds really like "cyber", a nickname of the internet.

The `cyper-core` crate provides some adapters. It deals with the different APIs of `hyper` and `compio`, and combines HTTP and HTTPS. `hyper` is designed for `tokio`, though it allows switching to another runtime. It requires all types and tasks to be `Send`. We use `SendWrapper` here to bypass the requirements. Anyway, `compio` is a single-threaded runtime, and no tasks would be sent to other threads.
