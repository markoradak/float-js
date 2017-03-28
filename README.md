# Float.js
A tiny (**0.78kb** gzipped), requestAnimationFrame powered, 60+fps decelerated parallax layer offsetting engine that reacts to the mouse position or device orientation.

### Usage
```html
<div data-float='0.5'>
```

### Options
```js
floatJS.init({

  'deceleration':   0.5, // Defines animation deceleration rate (default: 0.5).
  'strength':       0.5, // Defines how much layers are offset (default: 0.5).
  'precision':        1, // Decimal points for transform values (default: 1).
  'direction':       -1  // 1 = linear, -1 = natural / inverted (default: -1).

})
```

### NPM

Available on npm: https://www.npmjs.com/package/float-js

### License

MIT License
