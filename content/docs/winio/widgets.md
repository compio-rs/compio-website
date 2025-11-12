# Widgets

This section covers all provided components in `winio`.

In this section, all methods are expressed as `fn method`, and all "properties" are expressed as `prop property: type`.
There's no property syntax in Rust, so they are actually `fn property` (or `fn is_property` for `bool` properties) and `fn set_property`.
A read-only property is expressed as `prop property: const type`.
A write-only property is expressed as `prop property: set type`.

## Predefined traits

### Trait `Visible`

| Members              | Description                      |
| -------------------- | -------------------------------- |
| `prop visible: bool` | The visibility of the component. |
| `fn show(&mut self)` | Shows the component.             |
| `fn hide(&mut self)` | Hides the component.             |

### Trait `Enable`

| Members                 | Description                         |
| ----------------------- | ----------------------------------- |
| `prop enabled: bool`    | The enabled state of the component. |
| `fn enable(&mut self)`  | Enables the component.              |
| `fn disable(&mut self)` | Disables the component.             |

### Trait `Layoutable`

| Members                           | Description                          |
| --------------------------------- | ------------------------------------ |
| `prop loc: Point`                 | The location of the component.       |
| `prop size: Size`                 | The size of the component.           |
| `prop rect: Rect`                 | The rectangle of the component.      |
| `prop preferred_size: const Size` | The preferred size of the component. |
| `prop min_size: const Size`       | The minimum size of the component.   |


### Trait `ToolTip`

| Members                | Description                        |
| ---------------------- | ---------------------------------- |
| `prop tooltip: String` | The tooltip text of the component. |

### Trait `TextWidget`

| Members             | Description                     |
| ------------------- | ------------------------------- |
| `prop text: String` | The text content of the widget. |

## `Window`

Implements [`AsWindow`], [`AsContainer`], [`Visible`], [`Layoutable`].

A simple window.

| Members                        | Description                    |
| ------------------------------ | ------------------------------ |
| `prop text: String`            | The title of the window.       |
| `prop client_size: const Size` | The client size of the window. |

| Events         | Description                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------- |
| `Close`        | Triggered when the window is requested to close. The window WILL NOT close if it is ignored. |
| `Move`         | Triggered when the window is moved.                                                          |
| `Resize`       | Triggered when the window is resized.                                                        |
| `ThemeChanged` | Triggered when the system theme is changed.                                                  |

### Win32 specific

| Members              | Description                             |
| -------------------- | --------------------------------------- |
| `prop style: u32`    | The Win32 style of the window.          |
| `prop ex_style: u32` | The Win32 extended style of the window. |

### Windows specific

| Members                    | Description                          |
| -------------------------- | ------------------------------------ |
| `prop icon_by_id: set u16` | Sets the window icon by resource ID. |
| `prop backdrop: Backdrop`  | The backdrop effect of the window.   |

### MacOS specific

| Members                   | Description                        |
| ------------------------- | ---------------------------------- |
| `prop vibrancy: Vibrancy` | The vibrancy effect of the window. |

## `Button`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Events  | Description                           |
| ------- | ------------------------------------- |
| `Click` | Triggered when the button is clicked. |

## `Canvas`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

| Members                                   | Description                             |
| ----------------------------------------- | --------------------------------------- |
| `fn context(&mut self) -> DrawingContext` | Gets the drawing context of the canvas. |

| Events                   | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `MouseMove(Point)`       | Triggered when the mouse moves over the canvas.             |
| `MouseDown(MouseButton)` | Triggered when a mouse button is pressed over the canvas.   |
| `MouseUp(MouseButton)`   | Triggered when a mouse button is released over the canvas.  |
| `MouseWheel`             | Triggered when the mouse wheel is scrolled over the canvas. |

## `CheckBox`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Members              | Description                        |
| -------------------- | ---------------------------------- |
| `prop checked: bool` | The checked state of the checkbox. |

| Events  | Description                             |
| ------- | --------------------------------------- |
| `Click` | Triggered when the checkbox is clicked. |

## `ComboBox`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Members                                                     | Description                              |
| ----------------------------------------------------------- | ---------------------------------------- |
| `prop selection: Option<usize>`                             | The selected index of the combo box.     |
| `prop editable: bool`                                       | Whether the combo box is editable.       |
| `prop len: const usize`                                     | The number of items in the combo box.    |
| `prop empty: const bool`                                    | Whether the combo box is empty.          |
| `fn clear(&mut self)`                                       | Clears all items in the combo box.       |
| `fn get(&mut self, index: usize) -> String`                 | Gets the item at the specified index.    |
| `fn set(&mut self, index: usize, item: impl AsRef<str>)`    | Sets the item at the specified index.    |
| `fn insert(&mut self, index: usize, item: impl AsRef<str>)` | Inserts an item at the specified index.  |
| `fn remove(&mut self, index: usize)`                        | Removes the item at the specified index. |
| `fn push(&mut self, item: impl AsRef<str>)`                 | Appends an item to the combo box.        |
| `prop items: set IntoIterator<Item = Into<String>>`         | Sets multiple items to the combo box.    |

| Events   | Description                         |
| -------- | ----------------------------------- |
| `Select` | Triggered when an item is selected. |
| `Change` | Triggered when the text is changed. |

| Messages                               | Description                               |
| -------------------------------------- | ----------------------------------------- |
| `Insert { at: usize, value: String }`  | Inserts an item at the specified index.   |
| `Remove { at: usize }`                 | Removes the item at the specified index.  |
| `Replace { at: usize, value: String }` | Replaces the item at the specified index. |
| `Clear`                                | Clears all items in the combo box.        |

## `Edit`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

A single line text edit control.

| Members               | Description                           |
| --------------------- | ------------------------------------- |
| `prop password: bool` | Whether the edit is a password box.   |
| `prop halign: HAlign` | The horizontal alignment of the text. |
| `prop readonly: bool` | Whether the edit is read-only.        |

| Events   | Description                         |
| -------- | ----------------------------------- |
| `Change` | Triggered when the text is changed. |

## `Label`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Members               | Description                           |
| --------------------- | ------------------------------------- |
| `prop halign: HAlign` | The horizontal alignment of the text. |

### Win32 specific

| Members                  | Description                                  |
| ------------------------ | -------------------------------------------- |
| `prop transparent: bool` | Whether the label background is transparent. |

## `ListBox`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

| Members                                                     | Description                                          |
| ----------------------------------------------------------- | ---------------------------------------------------- |
| `prop selected(i: usize): bool`                             | Whether the item at the specified index is selected. |
| `prop len: const usize`                                     | The number of items in the list box.                 |
| `prop empty: const bool`                                    | Whether the list box is empty.                       |
| `fn clear(&mut self)`                                       | Clears all items in the list box.                    |
| `fn get(&mut self, index: usize) -> String`                 | Gets the item at the specified index.                |
| `fn set(&mut self, index: usize, item: impl AsRef<str>)`    | Sets the item at the specified index.                |
| `fn insert(&mut self, index: usize, item: impl AsRef<str>)` | Inserts an item at the specified index.              |
| `fn remove(&mut self, index: usize)`                        | Removes the item at the specified index.             |
| `fn push(&mut self, item: impl AsRef<str>)`                 | Appends an item to the list box.                     |
| `prop items: set IntoIterator<Item = Into<String>>`         | Sets multiple items to the list box.                 |

| Events   | Description                         |
| -------- | ----------------------------------- |
| `Select` | Triggered when an item is selected. |

| Messages                               | Description                               |
| -------------------------------------- | ----------------------------------------- |
| `Insert { at: usize, value: String }`  | Inserts an item at the specified index.   |
| `Remove { at: usize }`                 | Removes the item at the specified index.  |
| `Replace { at: usize, value: String }` | Replaces the item at the specified index. |
| `Clear`                                | Clears all items in the list box.         |

## `Media`

Needs `media` feature.

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

A media control. The supported formats depend on the underlying platform.

| Members                                                  | Description                                                           |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| `async fn load(&mut self, url: impl AsRef<str>) -> bool` | Loads the media from the specified URL. Returns `true` if successful. |
| `prop url: const String`                                 | The URL of the media resource.                                        |
| `prop volume: f32`                                       | The volume of the media (0.0 to 1.0).                                 |
| `prop muted: bool`                                       | Whether the media is muted.                                           |
| `prop full_time: const Option<Duration>`                 | The total duration of the media.                                      |
| `prop current_time: Duration`                            | The current playback position of the media.                           |
| `fn play(&mut self)`                                     | Plays the media.                                                      |
| `fn pause(&mut self)`                                    | Pauses the media.                                                     |
| `fn seek(&mut self, t: Duration)`                        | Seeks to the specified position.                                      |

## `Progress`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

| Members                    | Description                                |
| -------------------------- | ------------------------------------------ |
| `prop minimum: usize`      | The minimum value of the progress bar.     |
| `prop maximum: usize`      | The maximum value of the progress bar.     |
| `prop pos: usize`          | The current value of the progress bar.     |
| `prop indeterminate: bool` | Whether the progress bar is indeterminate. |

## `RadioButton`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Members              | Description                            |
| -------------------- | -------------------------------------- |
| `prop checked: bool` | The checked state of the radio button. |

| Events  | Description                                 |
| ------- | ------------------------------------------- |
| `Click` | Triggered when the radio button is clicked. |

## `ScrollBar`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

| Members               | Description                          |
| --------------------- | ------------------------------------ |
| `prop orient: Orient` | The orientation of the scroll bar.   |
| `prop minimum: usize` | The minimum value of the scroll bar. |
| `prop maximum: usize` | The maximum value of the scroll bar. |
| `prop pos: usize`     | The current value of the scroll bar. |
| `prop page: usize`    | The page size of the scroll bar.     |

**Note:** The actual maximum value of `pos` is `maximum - page`.

| Events   | Description                                     |
| -------- | ----------------------------------------------- |
| `Change` | Triggered when the scroll bar position changes. |

## `ScrollView`

Implements [`AsWidget`], [`AsContainer`], [`AsContainer`], [`Visible`], [`Enable`], [`Layoutable`].

| Members              | Description                                   |
| -------------------- | --------------------------------------------- |
| `prop hscroll: bool` | Whether the horizontal scroll bar is visible. |
| `prop vscroll: bool` | Whether the vertical scroll bar is visible.   |

## `Slider`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

| Members                       | Description                       |
| ----------------------------- | --------------------------------- |
| `prop tick_pos: TickPosition` | The tick position of the slider.  |
| `prop orient: Orient`         | The orientation of the slider.    |
| `prop minimum: usize`         | The minimum value of the slider.  |
| `prop maximum: usize`         | The maximum value of the slider.  |
| `prop pos: usize`             | The current value of the slider.  |
| `prop freq: usize`            | The tick frequency of the slider. |

| Events   | Description                              |
| -------- | ---------------------------------------- |
| `Change` | Triggered when the slider value changes. |

## `TabView`

Implements [`AsWidget`], [`AsContainer`], [`Visible`], [`Enable`], [`Layoutable`].

| Members                                                  | Description                               |
| -------------------------------------------------------- | ----------------------------------------- |
| `prop selection: Option<usize>`                          | The selected tab index.                   |
| `prop len: const usize`                                  | The number of tabs.                       |
| `prop empty: const bool`                                 | Whether there are no tabs.                |
| `fn insert(&mut self, index: usize, item: &TabViewItem)` | Inserts a new tab at the specified index. |
| `fn push(&mut self, item: &TabViewItem)`                 | Appends a new tab.                        |
| `fn remove(&mut self, index: usize)`                     | Removes the tab at the specified index.   |
| `fn clear(&mut self)`                                    | Clears all tabs.                          |

| Events   | Description                       |
| -------- | --------------------------------- |
| `Select` | Triggered when a tab is selected. |

## `TabViewItem`

Implements [`AsContainer`], [`TextWidget`].

| Members                 | Description                      |
| ----------------------- | -------------------------------- |
| `prop size: const Size` | The client size of the tab item. |

## `TextBox`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Members               | Description                           |
| --------------------- | ------------------------------------- |
| `prop halign: HAlign` | The horizontal alignment of the text. |
| `prop readonly: bool` | Whether the text box is read-only.    |

| Events   | Description                         |
| -------- | ----------------------------------- |
| `Change` | Triggered when the text is changed. |

## `View`

Implements [`AsWidget`], [`AsContainer`], [`Visible`], [`Layoutable`].

A simple container.

## `WebView`

Needs `webview` feature.

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`].

| Members                                                   | Description                              |
| --------------------------------------------------------- | ---------------------------------------- |
| `prop source: String`                                     | The source URL of the webview.           |
| `prop html: set String`                                   | Sets the HTML content of the webview.    |
| `prop can_go_back: const bool`                            | Whether the webview can go back.         |
| `prop can_go_forward: const bool`                         | Whether the webview can go forward.      |
| `fn navigate(&mut self, url: impl AsRef<str>)`            | Navigates to the specified URL.          |
| `fn navigate_to_string(&mut self, html: impl AsRef<str>)` | Navigates to the specified HTML content. |
| `fn go_back(&mut self)`                                   | Goes back in the navigation history.     |
| `fn go_forward(&mut self)`                                | Goes forward in the navigation history.  |
| `fn reload(&mut self)`                                    | Reloads the current page.                |
| `fn stop(&mut self)`                                      | Stops loading the current page.          |

| Events       | Description                                     |
| ------------ | ----------------------------------------------- |
| `Navigating` | Triggered when the webview starts navigating.   |
| `Navigated`  | Triggered when the webview finishes navigating. |

[`AsWidget`]: ./handle.md#widget
[`AsContainer`]: ./handle.md#container
[`AsWindow`]: ./handle.md#window
[`Visible`]: #trait-visible
[`Enable`]: #trait-enable
[`Layoutable`]: #trait-layoutable
[`ToolTip`]: #trait-tooltip
[`TextWidget`]: #trait-textwidget
