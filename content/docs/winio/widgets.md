# Widgets

This section covers all provided components in `winio`.

In this section, all methods are expressed as `fn method`, and all "properties" are expressed as `prop property: mut type`.
There's no property syntax in Rust, so they are actually `fn property` (or `fn is_property` for `bool` properties) and `fn set_property`.
A read-only property is expressed as `prop property: type`.
A write-only property is expressed as `fn set_property: type`.

All writable properties are assignable in macro `init!`.

## Predefined traits

### Trait `Visible`

| Members                  | Description                      |
| ------------------------ | -------------------------------- |
| `prop visible: mut bool` | The visibility of the component. |
| `fn show(&mut self)`     | Shows the component.             |
| `fn hide(&mut self)`     | Hides the component.             |

### Trait `Enable`

| Members                  | Description                         |
| ------------------------ | ----------------------------------- |
| `prop enabled: mut bool` | The enabled state of the component. |
| `fn enable(&mut self)`   | Enables the component.              |
| `fn disable(&mut self)`  | Disables the component.             |

### Trait `Layoutable`

| Members                     | Description                          |
| --------------------------- | ------------------------------------ |
| `prop loc: mut Point`       | The location of the component.       |
| `prop size: mut Size`       | The size of the component.           |
| `prop rect: mut Rect`       | The rectangle of the component.      |
| `prop preferred_size: Size` | The preferred size of the component. |
| `prop min_size: Size`       | The minimum size of the component.   |


### Trait `ToolTip`

| Members                    | Description                        |
| -------------------------- | ---------------------------------- |
| `prop tooltip: mut String` | The tooltip text of the component. |

### Trait `TextWidget`

| Members                 | Description                     |
| ----------------------- | ------------------------------- |
| `prop text: mut String` | The text content of the widget. |

## `Window`

Implements [`AsWindow`], [`AsContainer`], [`Visible`], [`Layoutable`].

A simple window.

| Members                  | Description                    |
| ------------------------ | ------------------------------ |
| `prop text: mut String`  | The title of the window.       |
| `prop client_size: Size` | The client size of the window. |

| Events         | Description                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------- |
| `Close`        | Triggered when the window is requested to close. The window WILL NOT close if it is ignored. |
| `Move`         | Triggered when the window is moved.                                                          |
| `Resize`       | Triggered when the window is resized.                                                        |
| `ThemeChanged` | Triggered when the system theme is changed.                                                  |

### Win32 specific

| Members                  | Description                             |
| ------------------------ | --------------------------------------- |
| `prop style: mut u32`    | The Win32 style of the window.          |
| `prop ex_style: mut u32` | The Win32 extended style of the window. |

### Windows specific

| Members                       | Description                          |
| ----------------------------- | ------------------------------------ |
| `fn set_icon_by_id: u16`      | Sets the window icon by resource ID. |
| `prop backdrop: mut Backdrop` | The backdrop effect of the window.   |

### MacOS specific

| Members                       | Description                        |
| ----------------------------- | ---------------------------------- |
| `prop vibrancy: mut Vibrancy` | The vibrancy effect of the window. |

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

| Members                  | Description                        |
| ------------------------ | ---------------------------------- |
| `prop checked: mut bool` | The checked state of the checkbox. |

| Events  | Description                             |
| ------- | --------------------------------------- |
| `Click` | Triggered when the checkbox is clicked. |

## `ComboBox`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Members                                                     | Description                              |
| ----------------------------------------------------------- | ---------------------------------------- |
| `prop selection: mut Option<usize>`                         | The selected index of the combo box.     |
| `prop editable: mut bool`                                   | Whether the combo box is editable.       |
| `prop len: usize`                                           | The number of items in the combo box.    |
| `prop empty: bool`                                          | Whether the combo box is empty.          |
| `fn clear(&mut self)`                                       | Clears all items in the combo box.       |
| `fn get(&mut self, index: usize) -> String`                 | Gets the item at the specified index.    |
| `fn set(&mut self, index: usize, item: impl AsRef<str>)`    | Sets the item at the specified index.    |
| `fn insert(&mut self, index: usize, item: impl AsRef<str>)` | Inserts an item at the specified index.  |
| `fn remove(&mut self, index: usize)`                        | Removes the item at the specified index. |
| `fn push(&mut self, item: impl AsRef<str>)`                 | Appends an item to the combo box.        |
| `fn set_items: IntoIterator<Item = Into<String>>`           | Sets multiple items to the combo box.    |

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

| Members                   | Description                           |
| ------------------------- | ------------------------------------- |
| `prop password: mut bool` | Whether the edit is a password box.   |
| `prop halign: mut HAlign` | The horizontal alignment of the text. |
| `prop readonly: mut bool` | Whether the edit is read-only.        |

| Events   | Description                         |
| -------- | ----------------------------------- |
| `Change` | Triggered when the text is changed. |

## `Label`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Members                   | Description                           |
| ------------------------- | ------------------------------------- |
| `prop halign: mut HAlign` | The horizontal alignment of the text. |

### Win32 specific

| Members                      | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `prop transparent: mut bool` | Whether the label background is transparent. |

## `ListBox`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

| Members                                                     | Description                                          |
| ----------------------------------------------------------- | ---------------------------------------------------- |
| `prop selected(i: usize): mut bool`                         | Whether the item at the specified index is selected. |
| `prop len: usize`                                           | The number of items in the list box.                 |
| `prop empty: bool`                                          | Whether the list box is empty.                       |
| `fn clear(&mut self)`                                       | Clears all items in the list box.                    |
| `fn get(&mut self, index: usize) -> String`                 | Gets the item at the specified index.                |
| `fn set(&mut self, index: usize, item: impl AsRef<str>)`    | Sets the item at the specified index.                |
| `fn insert(&mut self, index: usize, item: impl AsRef<str>)` | Inserts an item at the specified index.              |
| `fn remove(&mut self, index: usize)`                        | Removes the item at the specified index.             |
| `fn push(&mut self, item: impl AsRef<str>)`                 | Appends an item to the list box.                     |
| `fn set_items: IntoIterator<Item = Into<String>>`           | Sets multiple items to the list box.                 |

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
| `prop url: String`                                       | The URL of the media resource.                                        |
| `prop volume: mut f32`                                   | The volume of the media (0.0 to 1.0).                                 |
| `prop muted: mut bool`                                   | Whether the media is muted.                                           |
| `prop full_time: Option<Duration>`                       | The total duration of the media.                                      |
| `prop current_time: mut Duration`                        | The current playback position of the media.                           |
| `fn play(&mut self)`                                     | Plays the media.                                                      |
| `fn pause(&mut self)`                                    | Pauses the media.                                                     |
| `fn seek(&mut self, t: Duration)`                        | Seeks to the specified position.                                      |

## `Progress`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

| Members                        | Description                                |
| ------------------------------ | ------------------------------------------ |
| `prop minimum: mut usize`      | The minimum value of the progress bar.     |
| `prop maximum: mut usize`      | The maximum value of the progress bar.     |
| `prop pos: mut usize`          | The current value of the progress bar.     |
| `prop indeterminate: mut bool` | Whether the progress bar is indeterminate. |

## `RadioButton`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Members                  | Description                            |
| ------------------------ | -------------------------------------- |
| `prop checked: mut bool` | The checked state of the radio button. |

| Events  | Description                                 |
| ------- | ------------------------------------------- |
| `Click` | Triggered when the radio button is clicked. |

## `ScrollBar`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

| Members                   | Description                          |
| ------------------------- | ------------------------------------ |
| `prop orient: mut Orient` | The orientation of the scroll bar.   |
| `prop minimum: mut usize` | The minimum value of the scroll bar. |
| `prop maximum: mut usize` | The maximum value of the scroll bar. |
| `prop pos: mut usize`     | The current value of the scroll bar. |
| `prop page: mut usize`    | The page size of the scroll bar.     |

**Note:** The actual maximum value of `pos` is `maximum - page`.

| Events   | Description                                     |
| -------- | ----------------------------------------------- |
| `Change` | Triggered when the scroll bar position changes. |

## `ScrollView`

Implements [`AsWidget`], [`AsContainer`], [`AsContainer`], [`Visible`], [`Enable`], [`Layoutable`].

| Members                  | Description                                   |
| ------------------------ | --------------------------------------------- |
| `prop hscroll: mut bool` | Whether the horizontal scroll bar is visible. |
| `prop vscroll: mut bool` | Whether the vertical scroll bar is visible.   |

## `Slider`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`ToolTip`].

| Members                           | Description                       |
| --------------------------------- | --------------------------------- |
| `prop tick_pos: mut TickPosition` | The tick position of the slider.  |
| `prop orient: mut Orient`         | The orientation of the slider.    |
| `prop minimum: mut usize`         | The minimum value of the slider.  |
| `prop maximum: mut usize`         | The maximum value of the slider.  |
| `prop pos: mut usize`             | The current value of the slider.  |
| `prop freq: mut usize`            | The tick frequency of the slider. |

| Events   | Description                              |
| -------- | ---------------------------------------- |
| `Change` | Triggered when the slider value changes. |

## `TabView`

Implements [`AsWidget`], [`AsContainer`], [`Visible`], [`Enable`], [`Layoutable`].

| Members                                                  | Description                               |
| -------------------------------------------------------- | ----------------------------------------- |
| `prop selection: mut Option<usize>`                      | The selected tab index.                   |
| `prop len: usize`                                        | The number of tabs.                       |
| `prop empty: bool`                                       | Whether there are no tabs.                |
| `fn insert(&mut self, index: usize, item: &TabViewItem)` | Inserts a new tab at the specified index. |
| `fn push(&mut self, item: &TabViewItem)`                 | Appends a new tab.                        |
| `fn remove(&mut self, index: usize)`                     | Removes the tab at the specified index.   |
| `fn clear(&mut self)`                                    | Clears all tabs.                          |

| Events   | Description                       |
| -------- | --------------------------------- |
| `Select` | Triggered when a tab is selected. |

## `TabViewItem`

Implements [`AsContainer`], [`TextWidget`].

| Members           | Description                      |
| ----------------- | -------------------------------- |
| `prop size: Size` | The client size of the tab item. |

## `TextBox`

Implements [`AsWidget`], [`Visible`], [`Enable`], [`Layoutable`], [`TextWidget`], [`ToolTip`].

| Members                   | Description                           |
| ------------------------- | ------------------------------------- |
| `prop halign: mut HAlign` | The horizontal alignment of the text. |
| `prop readonly: mut bool` | Whether the text box is read-only.    |

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
| `prop source: mut String`                                 | The source URL of the webview.           |
| `prop can_go_back: bool`                                  | Whether the webview can go back.         |
| `prop can_go_forward: bool`                               | Whether the webview can go forward.      |
| `fn navigate(&mut self, url: impl AsRef<str>)`            | Navigates to the specified URL.          |
| `fn set_html: String`                                     | Sets the HTML content of the webview.    |
| `fn navigate_to_string(&mut self, html: impl AsRef<str>)` | Navigates to the specified HTML content. |
| `fn go_back(&mut self)`                                   | Goes back in the navigation history.     |
| `fn go_forward(&mut self)`                                | Goes forward in the navigation history.  |
| `fn reload(&mut self)`                                    | Reloads the current page.                |
| `fn stop(&mut self)`                                      | Stops loading the current page.          |

| Events       | Description                                     |
| ------------ | ----------------------------------------------- |
| `Navigating` | Triggered when the webview starts navigating.   |
| `Navigated`  | Triggered when the webview finishes navigating. |

[`AsWidget`]: ./handle#widget
[`AsContainer`]: ./handle#container
[`AsWindow`]: ./handle#window
[`Visible`]: #trait-visible
[`Enable`]: #trait-enable
[`Layoutable`]: #trait-layoutable
[`ToolTip`]: #trait-tooltip
[`TextWidget`]: #trait-textwidget
