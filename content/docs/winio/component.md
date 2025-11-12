# Component

Inspired by ELM frameworks, `winio` also follows such design. Trait `Component` is the fundamental abstract of all widgets and widget groups.

```rust
pub trait Component: Sized {
    type Init<'a>;
    type Message;
    type Event;

    fn init(init: Self::Init<'_>, sender: &ComponentSender<Self>) -> Self;
    async fn start(&mut self, sender: &ComponentSender<Self>) -> !;
    async fn update(&mut self, message: Self::Message, sender: &ComponentSender<Self>) -> bool;
    fn render(&mut self, sender: &ComponentSender<Self>);

    async fn update_children(&mut self) -> bool {
        false
    }
    fn render_children(&mut self) {}
}
```

## `Init`

Type `Init` is the initial parameter passed to `Component::init`. Usually `Init` contains some owned parameters and states, or the reference to the parent, e.g., `Window`.

## `Message` & `Event`

`Message` is the internal message, while `Event` is the output message. The parent receives the events from the children, and translates them to the message of the parent itself.

Method `start` is called before `update`. `Component::start` listens to the widgets' events and sends messages and events to the `ComponentSender`. `Component::update` only processes the messages, and return a boolean value to indicate whether the component needs to be rendered. Heavy render code should be placed in `Component::render`.

`start` is an async function that never returns. It is expected to be interrupted by the runtime.

## `Child`

A component embeds itself into the parent component with the adaptor `Child`. It contains helper methods to handle the conversion from child events to parent messages.

## Macros

There are helper macros for `init` and `start`.
