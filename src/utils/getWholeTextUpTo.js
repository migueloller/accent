import isTextLike from './isTextLike.js';
import isHighlight from './isHighlight.js';

/**
 * @param {Text} node
 * @returns {string}
 */
export default function getWholeTextUpTo(node) {
  let current = node;
  let wholeText = '';

  // get the text from all the previous siblings
  while (current.previousSibling) {
    current = current.previousSibling;

    if (isTextLike(current)) {
      wholeText = current.textContent + wholeText;
    } else {
      return wholeText;
    }
  }

  // if there are no more previous siblings and the parent is a highlight then
  // there could be more text to consider...
  if (current.parentNode && isHighlight(current.parentNode)) {
    return getWholeTextUpTo(current.parentNode) + wholeText;
  }

  return wholeText;
}
