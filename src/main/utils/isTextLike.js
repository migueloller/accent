import isText from './isText.js';
import isHighlight from './isHighlight.js';

/**
 * @param {Node} node
 * @returns {boolean}
 */
export default function isTextLike(node) {
  return isText(node) || isHighlight(node);
}
