# accent
A simple library for serializable highlights.

```js
import Accent from 'accent';

const accent = new Accent();

accent.highlightCurrentSelection()
  .then(highlight => {
    highlight.scrollIntoView();
  }).catch(err => {
    console.log('Oh no!');
  });

/* or */

accent.highlightFromString('Hello, world!')
  .then(highlight => {
    highlight.scrollIntoView();
  }).catch(err => {
    console.log('Oh no!');
  });
```

# Installation
```
npm install accent --save
```

# Usage
Bundle with [browserify](http://browserify.org/) if you're building a project with [node](https://nodejs.org/).

Or, if making a static website, paste this line of HTML into your code:
```html
<script src="https://www.brcdn.org/accent/latest/?standalone=Accent"></script>
```
`Accent` will be available in the global scope.

# License
[MIT](https://github.com/migueloller/accent/blob/master/LICENSE)
