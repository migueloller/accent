import { HIGHLIGHT_TAG } from './../constants.js';

/**
 * @param {Node} node
 * @returns {boolean}
 */
export default function isHighlight(node) {
  return node.nodeName.toLowerCase() === HIGHLIGHT_TAG.toLowerCase();
}
