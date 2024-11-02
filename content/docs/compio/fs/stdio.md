# Standard IO

Stdio represents the input & output in a console. On Unix, they are always the first 3 fds, and just behave like pipes.

## Console standard handles on Windows

The characteristics of the console handles differs. A standard handle supports "overlapped" operations only when it is a redirection pipe. Therefore, the crate tries to determine whether the handle supports async operations, and fallbacks to `std` if not.

Encoding is another issue. When the handle is a console, it inputs and outputs UTF-16. Or it uses UTF-8. This behavior may confuse some users, but is consistent with `std`.
