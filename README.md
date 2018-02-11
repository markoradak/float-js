# Float.js
A tiny (**0.78kb** gzipped), requestAnimationFrame powered, 60+fps decelerated parallax layer offsetting engine that reacts to the mouse position or device orientation.

### Usage and Options
```html
<div data-float='0.5'>
```

```js
import FloatJS from 'float-js';

const float = new FloatJS({
  'attribute': 'data-float', // Defines attribute selector.
  'deceleration':       0.5, // Defines animation deceleration rate.
  'strength':           0.5, // Defines how much layers are offset.
  'precision':            1, // Decimal points for transform values.
  'direction':           -1  // 1 = linear, -1 = natural / inverted.
});
```

### NPM

Available on npm: https://www.npmjs.com/package/float-js

### License

MIT License
