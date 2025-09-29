<a name="readme-top"></a>
<br />

<div align="center">
  <a href="">
    <img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-mono/128/Mirror-icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Kaleidoscope Canvas</h3>

  <p align="center">
    <br />
    <a href="https://jeromejoh.github.io/kaleidoscope-canvas/">View Demo</a>
  </p>
</div>

### About The Project

A lightweight and customizable 3D animated butterfly component built with pure HTML, CSS, and SVG. This component provides a beautiful, floating butterfly animation that can be easily integrated into any web page to add a touch of dynamic flair and visual interest. The design is modular, allowing for seamless replacement of the central SVG element, making it highly versatile for various creative uses.

### Installation

Run this demo on a [local server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server).

### Customization

The animation's core properties can be easily customized using data- attributes on the custom-butterfly-animation element. This allows you to control the animation's timing directly from your HTML without touching the CSS.

- **data-top:** Sets the vertical position offset from the center of scene.

  - _Value:_ A CSS length value (e.g., "-150px", "10vh").

  - _Default:_ 0px.

- **data-left**: Sets the horizontal position offset from the center of scene.

  - _Value:_ A CSS length value (e.g., "-150px", "10vh").

  - _Default:_ 0px.

- **data-main-animation-duration:** Controls the duration of the main floating and rotating animation.

  - _Value:_ A CSS time value (e.g., "5s", "15s").

  - _Default:_ 4s.

- **data-wing-animation-duration:** Sets the duration for the wing flapping animation.

  - _Value:_ A CSS time value (e.g., "0.75s", "0.2s").

  - _Default:_ .45s

- **data-fill-color:** Sets the fill color for the inner SVG.

  - _Value:_ A CSS color value (e.g., "red", "#FF5733").

  - _Default:_ (Inherits from CSS)

- **data-stroke-color:** Sets the stroke (outline) color for the inner SVG.

  - _Value:_ A CSS color value (e.g., "black", "rgba(0, 0, 0, 0.5)").

  - _Default:_ (Inherits from CSS)

- **dev:** A boolean attribute to enable a debug mode (e.g., for showing bounding boxes).

  - _Value:_ Present or absent (e.g., <... dev>).

### Preview

![preview](./preview.gif)

### Contact

Author: [jerome200069@outlook.com](mailto:jerome200069@outlook.com)

Demo Link: [https://github.com/JeromeJoh/it-gives-you-butterflies](https://github.com/JeromeJoh/it-gives-you-butterflies)

### License

[MIT](LICENSE)
