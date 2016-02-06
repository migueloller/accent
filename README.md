# accent
A simple library for serializable highlights.

```js
import Accent from 'accent';

const accent = new Accent();

accent.highlightCurrentSelection()
  .then(highlight => {
    highlight.scrollIntoView();
  }).catch(err => {
    console.log(err);
  });

/* or */

accent.highlightFromString('Hello, world!')
  .then(highlight => {
    highlight.scrollIntoView();
  }).catch(err => {
    console.log(err);
  });
```

## Installation
```
npm install accent --save
```

## accent API

### accent.selection() `async`
Asynchronously highlights the current selection.
```js
accent.selection().then(highlight => {
  if (highlight) getSelection().isCollapsed; // true, because the selection gets cleared
});
```

### accent.range(range) `async`
Asynchronously highlights `range`.
```js
accent.range(range).then(highlight => {
  if (highlight) highlight.text === range.toString(); // true, if `range` didn't change
});
```

### accent.string(string[, fromIndex]) `async`
Asynchronously highlights the first occurrence of `string` in the document's body, starting at `fromIndex`. The default value of `fromIndex` is 0.
```js
accent.string('foo', 42).then(highlight => {
  if (highlight) highlight.text === 'foo'; // true
});
```

### accent.deserialize(serialization) `async`
Asynchronously deserializes and highlights `serialization`. `serialization` can be a serialized highlight or an array of serialized highlights.
```js
// http://www.example.com/
const serialization = [{
  text: 'Example',
  index: 6,
  range: {
    startContainer: '/html/body/div/h1/text()',
    startOffset: 0,
    endContainer: '/html/body/div/h1/text()',
    endOffset: 7,
  },
}];

accent.deserialize(serialization).then(highlights => {
  const highlight = highlights[0];

  if (highlight) JSON.stringify(highlight.serialize()) === JSON.stringify(json); // true
});
```

### accent.serialize()
Returns a serialization of all the highlights.
```js
accent.serialize(); // []

// http://www.example.com/
accent.string('Example').then(() => {
  accent.serialize(); // [{ text: 'Example', index: 6, range: { startContainer: '/html/body/div/h1/text()', startOffset: 0, endContainer: '/html/body/div/h1/text()', endOffset: 7 } }]
});
```

### accent.on(events, handler)
Registers `handler` to `events`. `events` is a whitespace delimited string of event names. `handler` is a function that will be called each time a registered event is fired.
```js
accent.on('highlight', highlight => {
  console.log('highlighted!');
});
```

The following events can be tracked with `accent.on(events, handler)`:

Event Name  | Handler Arguments | Event Description
------------|-------------------|------------------
`highlight` |`highlight`        |`highlight` was just created and mounted


### accent.off([events][, handler])
Removes `handler` from `events`. `events` is a whitespace delimited string of event names. `handler` is a function that was previously registered with [`accent.on(events, handler)`](#). If only `events` if provided, all handlers will be removed from `events`. If no parameters are provided, all handlers are removed from all events. `handler` can only be provided together with `events`.
```js
const handler = highlight => {};

accent.on('highlight', handler); // 1 `highlight` event registered
accent.on('highlight', highlight => {}); // 2 `highlight` events registered

accent.off('highlight', handler); // 1 `highlight` events registered
accent.off('highlight'); // 0 `highlight` events registered

accent.on('highlight', handler); // 1 `highlight` event registered
accent.on('highlight', highlight => {}); // 2 `highlight` events registered

accent.off(); // 0 `highlight` events registered
```

## Highlight API

### mount() `async`

### unmount()

### focus()

### blur()

### serialize()

### on(events, handler[, useCapture])

Event Name  | Handler Arguments | Event Description
------------|-------------------|------------------
`mount`     |                   |
`unmount`   |                   |
`focus`     |                   |
`blur`      |                   |
`click`     |                   |
`dblclick`  |                   |
`mousedown` |                   |
`mouseup`   |                   |
`mouseenter`|                   |
`mouseleave`|                   |
`mousemove` |                   |

### off([events][, handler])

### getBoundingClientRect()

### scrollIntoView([duration])

### hasClass(className)

### addClass(className)

### removeClass(className)

### toggleClass(className)

### hasAttribute(attributeName)

### getAttribute(attributeName)

### setAttribute(attributeName[, value])

### removeAttribute(attributeName)


## License
[MIT](https://github.com/migueloller/accent/blob/master/LICENSE)
