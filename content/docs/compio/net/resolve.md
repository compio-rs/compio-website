# Asynchronous resolve

`ToSocketAddrsAsync` provides asynchronous address resolution functionality. It spawns a blocking task to the thread pool on Unix, and uses `GetAddrInfoExW` on Windows.

This Windows API uses the WinSock thread pool internally.

Both `bind` and `connect` use this trait, but usually you cannot bind to a remote server. An async task is always created when the user tries to bind to "localhost".
