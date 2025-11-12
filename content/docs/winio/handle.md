# Handle

A handle is an abstraction of a resource in `winio`, such as a window handle or a widget handle. It exposes native types for the users to manipulate the underlying resources directly.

There are three kinds of handles in `winio`.

## Window

A window is a window - the top-level container of all widgets. It provides special methods and properties to manage the window itself, such as setting the title, resizing, and handling window events.

| Platform | Type                          |
| -------- | ----------------------------- |
| Win32    | `HWND`                        |
| WinUI    | `Microsoft::UI::Xaml::Window` |
| macOS    | `NSWindow`                    |
| Qt       | `QWidget`                     |
| GTK      | `gtk4::Window`                |

Only `Window` type implements `AsWindow` and `AsRawWindow` traits, but you can always implement these traits for your own types if needed. This is rather useful when you want to embed `winio` components into your existing application.

## Container

A container can contain other widgets. A `Window` is a container, but not all containers are windows.
All children inside a container are positioned relative to the container.

| Platform | Type                                    |
| -------- | --------------------------------------- |
| Win32    | `HWND`                                  |
| WinUI    | `Microsoft::UI::Xaml::Controls::Canvas` |
| macOS    | `NSView`                                |
| Qt       | `QWidget`                               |
| GTK      | `gtk4::Fixed`                           |

**Note:** In `winio`, a container (e.g., `View`) is different from a layout helper (e.g., `Grid`). A layout helper arranges its children inside any provided `Rect`, while a container just holds its children without any layout logic.

## Widget

A widget is a UI element that provides specific functionality, such as a button, label, or combo box.

| Platform | Type                               |
| -------- | ---------------------------------- |
| Win32    | `HWND`                             |
| WinUI    | `Microsoft::UI::Xaml::Controls::*` |
| macOS    | `NSView`                           |
| Qt       | `QWidget`                          |
| GTK      | `gtk4::*`                          |
