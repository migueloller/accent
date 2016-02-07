import isHighlight from './../utils/isHighlight.js';
import getXPathName from './getXPathName.js';
import getXPathIndex from './getXPathIndex.js';

/**
 * @param {Node} node
 * @returns {string}
 */
export default function getXPath(node) {
  // highlights don't have an XPath because they weren't there in the first place!
  if (isHighlight(node)) {
    return '';
  }

  let current = node;
  let absolutePath = '';
  let idPath = '';

  // look at each parent node, get it's sibling index and form the path
  while (current.parentNode) {
    // shortcut for when an id is found
    if (!idPath && current.id) {
      idPath = `//*[@id="${node.id}"]${absolutePath}|`;
    }

    if (!isHighlight(current)) {
      absolutePath = `/${getXPathName(current)}[${getXPathIndex(current)}]${absolutePath}`;
    }

    current = current.parentNode;
  }

  return idPath + absolutePath;
}
