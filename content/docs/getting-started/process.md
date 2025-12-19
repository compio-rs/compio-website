---
title: Process
description: this is a description
---

`compio-process` is the async version of `std::process`. Different from the API of `tokio`, `compio::process::Command` doesn't redirect stdio by default.

It spawns the waiting task to the thread pool on Unix. On Linux, if `"nightly"` features are enabled, "pidfd" is used to avoid using the thread pool.
