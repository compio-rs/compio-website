# Layout

All layoutable components implements trait `Layoutable`. The layout helpers also implements `Layoutable` to allow nesting.

The layout algorithm is powered by `taffy`, a CSS like layout engine. However, the exposed API of `winio` is in XAML favor. It is the user's choice to use any kind of layout engines.

The layout helpers are lazy. They don't move or resize the widgets unless their locations or sizes are changed. It's a good practice to create and use them inside `Component::render` method. A helper macro `layout!` is provided.

## Stack panel

`StackPanel` is a stacked layout, or "flex" in CSS, but only supports one column or one row. The child can specify whether to grow to occupy all remain spaces of the panel.

## Grid

`Grid` is an XAML-like grid. The length of each column and row could be specified in strings, separated by comma `,`:

| Length str       | Meaning                  |
| ---------------- | ------------------------ |
| `auto`           | `GridLength::Auto`       |
| `0.5*, 1*, 2*`   | `GridLength::Stretch(_)` |
| `0.5, 1.14, 514` | `GridLength::Length(_)`  |

For example, passing `"auto, 1*, 2*, 50"` to `rows` means 4 rows. The first height is automatically determined, and the last height is a fixed number 50. The second height is always the half of the third one.
