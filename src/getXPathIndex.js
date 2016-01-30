import getXPathName from './getXPathName.js';
import isTextLike from './isTextLike.js';
import isHighlight from './isHighlight.js';

/**
 * @param {Node} node
 * @returns {number}
 */
export default function getXPathIndex(node) {
  let current = node;
  let index = 0;

  // count all previous siblings that have the same XPath name as the input node
  while (current) {
    // if the current node is text like then ignore it if the sibling in the
    // next iteration of the loop is also text like
    if (getXPathName(current) === getXPathName(node) && !(isTextLike(current) &&
        current.previousSibling && isTextLike(current.previousSibling))) {
      index++;
    }

    current = current.previousSibling;
  }

  // if the parent of the input node is a highlight then there is more to it...
  if (node.parentNode && isHighlight(node.parentNode)) {
    return index + getXPathIndex(node.parentNode) - 1;
  }

  return index;
}
