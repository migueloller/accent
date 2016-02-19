import { HIGHLIGHT_TAG } from './../Constants.js';

/**
 * @param {Node} node
 * @returns {boolean}
 */
export default function isHighlight(node) {
  return node.nodeName.toLowerCase() === HIGHLIGHT_TAG.toLowerCase();
}
