import isTextLike from './isTextLike.js';
import isHighlight from './isHighlight.js';
import getTextNodeFromOffset from './getTextNodeFromOffset.js';

/**
 * @param {string} path
 * @param {number} [offset]
 * @returns {?Node}
 */
export default function evaluateXPath(path, offset = 0) {
  const idMatch = path.match(/\[@id="(\S+)"\]/);
  const id = idMatch && idMatch[1];
  let p = path;

  // Only evaluate the XPath using the optimized id option if there is only one
  // element with that id in the entire document
  if (id && document.querySelectorAll(`#${id}`).length > 1) {
    p = p.split('|')[1];
  }

  const regex = /\/text\(\)\[(\d+)\]/;
  const match = p.match(regex);

  // check if the XPath pointed to a text node and if it did get its parent,
  // find the text node using the XPath's index and then find the text node at
  // the given offset
  if (match) {
    const index = parseInt(match[1], 10);

    // if the XPath is invalid or it's not found then an error will be thrown
    let sibling;
    try {
      sibling = document.evaluate(p.replace(new RegExp(regex.source, 'g'), ''),
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.firstChild;
    } catch (e) {
      return null;
    }

    // find the XPath's text node
    let i = 0;
    while (sibling) {
      if (isTextLike(sibling)) {
        // count the text only if it's not adjacent to a highlight
        if (!(sibling.previousSibling && isTextLike(sibling.previousSibling))) {
          i++;
        }

        // check if the text node is found
        if (i === index) {
          // if it's a highlight then the text node is the first descendant text
          // node
          if (isHighlight(sibling)) {
            while (sibling.firstChild) {
              sibling = sibling.firstChild;
            }
          }
          return getTextNodeFromOffset(sibling, offset, true);
        }
      }

      sibling = sibling.nextSibling;
    }
  } else {
    // if the XPath is invalid or it's not found then an error will be thrown
    try {
      return document.evaluate(p, document, null,
          XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    } catch (e) {
      return null;
    }
  }

  return null;
}
