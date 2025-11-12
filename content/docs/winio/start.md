# Start

A typical `winio` application starts with an `App` and a `Component`. Let's start from a basic `Component`.

## Define the data model

```rust
use winio::prelude::*;

struct MainModel {
    window: Child<Window>,
}
```

Any child `Component` should be wrapped by `Child`, which handles the internal messages and exposes friendly interfaces. Here we add a `Window` as the main window of the application.

Then we need to define the messages of this component.

```rust
enum MainMessage {
    Noop,
    Close,
}
```

The `Noop` message does nothing. It is here to make it easy for children passing their own internal messages.

The `Close` message is used to close the window. We will connect it to the `Close` event of the window, and handle it in the `update` method later.

We don't need to define the event of the root component, as it is only a quit signal for the application.

## Implement the Component trait

Now we can implement the `Component` trait for `MainModel`.

```rust
impl Component for MainModel {
    type Event = ();
    type Init<'a> = ();
    type Message = MainMessage;

    // ...
}
```

The `Init` type is empty, as we don't need any parameters to initialize the main model.

The first method we need to implement is `init`.

```rust
fn init(_init: Self::Init<'_>, _sender: &ComponentSender<Self>) -> Self {
    init! {
        window: Window = (()) => {
            text: "Example",
            size: Size::new(800.0, 600.0),
        }
    }
    window.show();
    Self { window }
}
```
The `init!` macro creates and initializes the child components. Here we create a `Window`, set its title and size, and show it.

**Note:** We always need to call `show()` on the window to make it visible. It provides better control over the initialization sequence.

Next, we implement the `start` method to connect events.

```rust
async fn start(&mut self, sender: &ComponentSender<Self>) -> ! {
    start! {
        sender, default: MainMessage::Noop,
        self.window => {
            WindowEvent::Close => MainMessage::Close,
        }
    }
}
```
The `start!` macro connects the events of child components to messages. Here we connect the `Close` event of the window to the `Close` message.
It's OK to ignore the events we don't care about.

Then we implement the `update` method to handle messages.

```rust
async fn update(&mut self, message: Self::Message, sender: &ComponentSender<Self>) -> bool {
    match message {
        MainMessage::Noop => false,
        MainMessage::Close => {
            // the root component output stops the application
            sender.output(());
            // need not to call `render`
            false
        }
    }
}
```
The return value of `update` indicates whether we need to re-render the component. Here we return `false` for both messages, as they don't change the UI.
When the `Close` message is received, we send the output event to stop the application.

Finally, we implement the `render` method. As our UI is static, we don't need to do anything here.

```rust
fn render(&mut self, _sender: &ComponentSender<Self>) {}
```

It's always a good practice to propagate the `update` and `render` calls to child components.

```rust
async fn update_children(&mut self) -> bool {
    self.window.update().await
}

fn render_children(&mut self) {
    self.window.render();
}
```

## Start the Application
Now we can start the application with `App`.

```rust
fn main() {
    App::new("rs.compio.winio.example").run::<MainModel>(());
}
```

The application ID is passed to `App::new`. It should be unique for each application, and might be used in some platforms.
The initialization parameters for the root component are passed to `run`. Here we pass an empty tuple, as `MainModel` doesn't need any parameters.

## The full code
Here is the full code of the example application.

```rust
use winio::prelude::*;

fn main() {
    App::new("rs.compio.winio.example").run::<MainModel>(());
}

struct MainModel {
    window: Child<Window>,
}

enum MainMessage {
    Noop,
    Close,
}

impl Component for MainModel {
    type Event = ();
    type Init<'a> = ();
    type Message = MainMessage;

    fn init(_init: Self::Init<'_>, _sender: &ComponentSender<Self>) -> Self {
        // create & initialize the window
        init! {
            window: Window = (()) => {
                text: "Example",
                size: Size::new(800.0, 600.0),
            }
        }
        window.show();
        Self { window }
    }

    async fn start(&mut self, sender: &ComponentSender<Self>) -> ! {
        // listen to events
        start! {
            sender, default: MainMessage::Noop,
            self.window => {
                WindowEvent::Close => MainMessage::Close,
            }
        }
    }

    async fn update_children(&mut self) -> bool {
        // update the window
        self.window.update().await
    }

    async fn update(&mut self, message: Self::Message, sender: &ComponentSender<Self>) -> bool {
        // deal with custom messages
        match message {
            MainMessage::Noop => false,
            MainMessage::Close => {
                // the root component output stops the application
                sender.output(());
                // need not to call `render`
                false
            }
        }
    }

    fn render(&mut self, _sender: &ComponentSender<Self>) {
        let csize = self.window.client_size();
        // adjust layout and draw widgets here
    }

    fn render_children(&mut self) {
        self.window.render();
    }
}
```
