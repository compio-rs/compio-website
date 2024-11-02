# Async GUI

Graphic user interfaces are naturally asynchronous. There should be a specialized GUI thread running a message loop, waiting for user inputs. The loop transforms the user inputs into messages, and dispatch them to different components to deal with it. GUI frameworks don't avoid telling about it. On Windows, a socket could be associated to a window handle `HWND`, and posts messages about the readiness. On macOS, the `CFRunLoop` provides a general loop for all high-level functionalities, including AppKit and IO.

However, most GUI frameworks and async runtimes seems totally different. The GUI frameworks usually process the events with callbacks, while async runtimes hide the inner loops with syntax sugars. It makes many problems. Many programmers write their IO code in the GUI thread. Even they are using the most fancy framework, it will block the GUI, making the interface stuck. `winio` tries to solve the difference, and to prove that IO could be performed in the same thread as GUI.

## Internals on Windows

We don't promise avoiding undocumented API here.

After Windows 8, the IOCP is also an event object, which means it could be waited by `MsgWaitForMultipleObjectsEx`. This API also waits for message queue, and it's the core API of `winio` runtime on Windows.

The DPI support it out of the box. Developers don't need to handle DPI at all.

Dark mode support is complicated. [KNSoft.SlimDetours](https://github.com/KNSoft/KNSoft.SlimDetours) is used to hook "UxTheme.dll" and handle the dark mode colors. The theme related methods are hooked by the custom one, to deal with the dark mode automatically. All supported widgets and the task dialog could now aware of the dark mode and switch color theme automatically.

## Internals on macOS

The `winio` runtime manages a `CFRunLoop` and an `NSApplication`. The fd of the proactor is added to the run loop as `CFFileDescriptor`. All code are written in Rust with the powerful crate `objc2`.

## Internals on GTK

GTK backend only runs on Linux. Only GTK 4.14+ is supported.

No `GtkApplication` is created. The `MainContext` of glib is created manually. The fd of the proactor is added to the context as a Unix fd.

GTK provides too high-level interfaces. It does not provide mid-level for others to wrap it the second time. We will try our best to continue supporting it.

## Internals on Qt

Qt is an async GUI runtime itself. Both Qt 5 and Qt 6 are supported.

It's not easy to use Qt in Rust. `cxx` is used to write some glue C++ code. The runtime creates `QApplication` in the current thread, and registers a timer with 0 timeout. The timer will be notified when the application is idle, and the callback polls the proactor. In that way, the `winio` runtime on Qt polls the proactor in a frequency at least 10Hz. This might be a drawback. If you have a better idea, feel free to contribute!
