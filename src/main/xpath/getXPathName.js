import isTextLike from './../utils/isTextLike.js';

/**
 * @param {Node} node
 * @returns {string}
 */
export default function getXPathName(node) {
  return isTextLike(node) ? 'text()' : node.tagName || 'node()';
}
