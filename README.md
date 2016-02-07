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

### Default Behavior
By default, when a highlight is clicked it will gain focus and a click to any element except the highlight's will cause it to lose focus. A focused highlight has the class `accent--focus`.

> _**Note:** Every `async` method has a synchronous method. For a method with name `func`, the method will be called `funcSync`. **Use with caution, these will block the browser.**_

### accent.selection() `async`
Asynchronously highlights the current selection. If the selection is collapsed, the returned promise resolves to null.
```js
accent.selection().then(highlight => {
  if (highlight) getSelection().isCollapsed; // true, because the selection gets cleared
});
```

### accent.range(range) `async`
Asynchronously highlights `range`. If the range is collapsed, the returned promise resolves to null.
```js
accent.range(range).then(highlight => {
  if (highlight) highlight.toString() === range.toString(); // true, if `range` didn't change
});
```

### accent.string(string[, fromIndex]) `async`
Asynchronously highlights the first occurrence of `string` in the document's body, starting at `fromIndex`. The default value of `fromIndex` is 0. If the string isn't found, the returned promise resolves to null.
```js
accent.string('foo').then(highlight => {
  if (highlight) highlight.toString(); // 'foo'
});
```

### accent.deserialize(serialization) `async`
Asynchronously deserializes and highlights `serialization`. `serialization` can be a serialized highlight or an array of serialized highlights. If given a serialized highlight and it is not found, the returned promise will resolve to null. If given an an array of serialized highlights and one or more are not found, the returned promise will resolve to an array with null values where the found highlights would've been.
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
  JSON.stringify(highlights[0].serialize()) === JSON.stringify(json); // true
});
```

### accent.focus(highlight)
Removes focus from the currently focused highlight, if there is one, and focuses `highlight`. This adds the class `accent--focus` to `highlight`.
```js
// http://www.example.com/
accent.string('Example').then(highlight => {
  accent.focus(highlight);
  highlight.hasClass('accent--focus'); // true
})
```

### accent.blur()
Removes focus from the currently focused highlight, if there is one. This removes the class `accent--focus` from the highlight.
```js
// http://www.example.com/
accent.string('Example').then(highlight => {
  accent.focus(highlight);
  highlight.hasClass('accent--focus'); // true
  accent.blur();
  highlight.hasClass('accent--focus'); // false
})
```

### accent.getFocused()
Returns the currently focused highlight or null if no highlight is currently focused.
```js
// http://www.example.com/
accent.string('Example').then(highlight => {
  accent.focus(highlight);
  accent.getFocused() === highlight; // true
})
```

### accent.highlights([callback])
Returns an array of all the highlights. The optional function `callback` will be passed each highlight.
```js
const highlights = accent.highlights(highlight => {
  // do something with `highlight`...
});

accent.serialize() === JSON.stringify(highlights.map(highlight => JSON.parse(highlight.serialize()))); // true
```

### accent.unmount()
An alias for `accent.highlights(highlight => highlight.unmount())`.
```js
accent.unmount(); // no highlights present in the document
```

### accent.mount() `async`
An alias for `accent.highlights(highlight => highlight.mount())`.
```js
accent.mount().then(() => {
  // all highlights present in the document
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
  // do something with `highlight`...
});
```
The following events can be tracked with `accent.on(events, handler)`:

 Event Name | Handler Arguments | Event Description
:-----------|:------------------|:------------------
`highlight` |`highlight`        |`highlight` was just created and mounted
`focus`     |`highlight`        |`highlight` was just focused
`blur`      |`highlight`        |`highlight` just lost focus

### accent.off([events][, handler])
Removes `handler` from `events`. `events` is a whitespace delimited string of event names. `handler` is a function that was previously registered with [`accent.on(events, handler)`](#accentonevents-handler). If only `events` if provided, all handlers will be removed from `events`. If no parameters are provided, all handlers are removed from all events. `handler` can only be provided together with `events`.
```js
const handler = highlight => {};

accent.on('highlight', handler); // 1 `highlight` event registered
accent.on('highlight', highlight => {}); // 2 `highlight` events registered

accent.off('highlight', handler); // 1 `highlight` events registered
accent.off('highlight'); // 0 events registered

accent.on('highlight', handler); // 1 `highlight` event registered
accent.on('highlight', highlight => {}); // 2 `highlight` events registered

accent.off(); // 0 events registered
```

## Highlight API
Let `highlight` represent an instance of `Highlight`.

### Default Behavior
By default, when the mouse enters a highlight it will get the class `accent-hover` and will lose it when the mouse leaves.

> _**Note:** Every `async` method has a synchronous method. For a method with name `func`, the method will be called `funcSync`. **Use with caution, these will block the browser.**_

### highlight.toString()
Returns the text of this highlight.
```js
accent.string('foo').then(highlight => {
  if (highlight) highlight.toString(); // `foo`
});
```

### highlight.mount() `async`
Asynchronously inserts this highlight into the DOM.
```js
accent.selection().then(highlight => {
  if (highlight) {
    highlight.unmount(); // removes `highlight` from the DOM
    highlight.mount(); // inserts `highlight` into the DOM  
  }
});
```

### highlight.unmount()
Removes this highlight from the DOM.
```js
accent.selection().then(highlight => {
  if (highlight) highlight.unmount(); // removes `highlight` from the DOM
});
```

### highlight.merge(highlight) `async`
Asynchronously merges `highlight` into this highlight. If the highlights don't form a continuous range, this method will throw an error. The new highlight contains all the listeners, classes, and attributes of this highlight. Mounts the new highlight only if this highlight was mounted.
```js
// http://www.example.com/
Promise.all([accent.string('Example Do'), accent.string('le Domain')]).then(highlights => {
  return highlights[0].merge(highlights[1]);
}).then(highlight => {
  highlight.toString(); // 'Example Domain'
});
```

### highlight.serialize()
Returns a serialization of this highlight.
```js
// http://www.example.com/
accent.string('Example').then(highlight => {
  highlight.serialize(); // { text: 'Example', index: 6, range: { startContainer: '/html/body/div/h1/text()', startOffset: 0, endContainer: '/html/body/div/h1/text()', endOffset: 7 } }
});
```

### highlight.on(events, handler[, useCapture])
Registers `handler` to `events`. `events` is a whitespace delimited string of event names. `handler` is a function that will be called each time a registered event is fired. See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener for `useCapture`.
```js
accent.on('highlight', highlight => {
  highlight.on('mount', () => {
    highlight.addClass('accent--yellow');
  });
});
```
The following events can be tracked with `highlight.on(events, handler[, useCapture])`:

 Event Name | Supports `useCapture` | Handler Arguments  | Event Description
:-----------|:---------------------:|:-------------------|:------------------
`mount`     |no                     |`highlight`         |`highlight` was just mounted
`unmount`   |no                     |`highlight`         |`highlight` was just unmounted
`click`     |yes                    |`event`, `highlight`|mouse was clicked on top of `highlight`
`dblclick`  |yes                    |`event`, `highlight`|mouse was clicked on top of `highlight` in quick succession
`mousedown` |yes                    |`event`, `highlight`|mouse was pressed on top of `highlight`
`mouseup`   |yes                    |`event`, `highlight`|mouse was released on top of `highlight`
`mouseenter`|yes                    |`event`, `highlight`|mouse entered `highlight`
`mouseleave`|yes                    |`event`, `highlight`|mouse left `highlight`
`mousemove` |yes                    |`event`, `highlight`|mouse moved on top of `highlight`
> _**Note:** See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent for more details on the `event` handler argument._

### highlight.off([events][, handler])
Removes `handler` from `events`. `events` is a whitespace delimited string of event names. `handler` is a function that was previously registered with [`highlight.on(events, handler)`](#highlightonevents-handler-usecapture). If only `events` if provided, all handlers will be removed from `events`. If no parameters are provided, all handlers are removed from all events. `handler` can only be provided together with `events`.
```js
const handler = highlight => highlight.addClass('accent--green');

accent.on('highlight', highlight => {
  highlight.on('mousedown', handler); // 1 'mousedown' event registered
  highlight.on('mouseup', highlight => highlight.removeClass('accent-green')); // 1 'mousedown' and 1 'mouseup' event registered

  highlight.off('mousedown', handler); // 1 'mouseup' event registered
  highlight.off('mouseup'); // 0 events registered

  highlight.on('mousedown', handler); // 1 'mousedown' event registered
  highlight.on('mouseup', highlight => highlight.removeClass('accent-green')); // 1 'mousedown' and 1 'mouseup' event registered

  highlight.off(); // 0 events registered
});
```

### highlight.getBoundingClientRect()
Returns a [ClientRect](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect) for this highlight.
```js
// http://www.example.com/
accent.string('Example').then(highlight => {
  highlight.getBoundingClientRect(); // { width: 131.453125, height: 38, top: 151.4375, right: 471.453125, bottom: 189.4375, left: 340 }
});
```

### highlight.scrollIntoView([duration])
Scrolls the viewport so that this highlight's bounding rectangle is centered vertically and horizontally in the viewport. If passed a number `duration`, then the scroll will be smooth last `duration` ms.
```js
accent.selection().then(highlight => {
  if (highlight) highlight.scrollIntoView();
});
```

### highlight.hasClass(className)
Returns true if this highlight has any class in `className`, else false. `className` is a whitespace delimited string of class names.
```js
accent.on('highlight', highlight => highlight.addClass('accent--yellow'));

accent.selection().then(highlight => {
  if (highlight) highlight.hasClass('accent--yellow'); // true
});
```

### highlight.addClass(className)
Adds all classes in `className` to this highlight. `className` is a whitespace delimited string of class names.
```js
accent.on('highlight', highlight => {
  highlight.addClass('accent--yellow');
  highlight.hasClass('accent--yellow'); // true
});
```

### highlight.removeClass(className)
Removes all classes in `className` from this highlight. `className` is a whitespace delimited string of class names.
```js
accent.on('highlight', highlight => {
  highlight.addClass('accent--yellow');
  highlight.removeClass('accent--yellow');
  highlight.hasClass('accent--yellow'); // false
});
```

### highlight.toggleClass(className)
Toggles all classes in `className` in this highlight. `className` is a whitespace delimited string of class names.
```js
accent.on('highlight', highlight => {
  highlight.toggleClass('accent--yellow');
  highlight.hasClass('accent--yellow'); // true
  highlight.toggleClass('accent--yellow');
  highlight.hasClass('accent--yellow'); // false
});
```

### highlight.hasAttribute(attributeName)
Returns true if this highlight has attribute `attributeName`, else false. `attributeName` is a string and can't contain any whitespace characters.
```js
accent.selection().then(highlight => {
  if (highlight) {
    highlight.setAttribute('data-accent-id', '1');
    highlight.hasAttribute('data-accent-id'); // true
  }
});
```

### highlight.getAttribute(attributeName)
Returns the value of the attribute `attributeName` if this highlight contains it, else null. `attributeName` is a string and can't contain any whitespace characters.
```js
accent.selection().then(highlight => {
  if (highlight) {
    highlight.setAttribute('data-accent-id', '1');
    highlight.getAttribute('data-accent-id'); // '1'
  }
});
```

### highlight.setAttribute(attributeName[, value])
Sets the value of the attribute `attributeName` to `value` to this highlight. `attributeName` is a string and can't contain any whitespace characters. `value` is an optional string which is empty by default.
```js
accent.selection().then(highlight => {
  if (highlight) {
    highlight.setAttribute('data-accent-id', '1')
    highlight.getAttribute('data-accent-id'); // '1'
  }
});
```

### highlight.removeAttribute(attributeName)
Removes the attribute `attributeName` from this highlight. `attributeName` is a string and can't contain any whitespace characters.
```js
accent.selection().then(highlight => {
  if (highlight) {
    highlight.setAttribute('data-accent-id', '1');
    highlight.hasAttribute('data-accent-id'); // true
    highlight.removeAttribute('data-accent-id');
    highlight.hasAttribute('data-accent-id'); // false
  }
});
```

## License
[MIT](https://github.com/migueloller/accent/blob/master/LICENSE)
