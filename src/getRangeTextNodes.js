import isText from './isText.js';
import rangeIntersectsNode from './rangeIntersectsNode.js';

/**
 * @param {Range} range
 * @returns {Text[]}
 */
export default function getRangeTextNodes(range) {
  const root = range.commonAncestorContainer;
  const textNodes = [];

  // if the common ancestor container is a text node then that's the only node in the range
  if (isText(root)) {
    textNodes.push(root);
    return textNodes;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);

  while (walker.nextNode()) {
    if (rangeIntersectsNode(range, walker.currentNode)) {
      textNodes.push(walker.currentNode);
    }
  }

  return textNodes;
}
