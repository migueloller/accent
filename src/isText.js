/**
 * @param {Node} node
 * @returns {boolean}
 */
export default function isText(node) {
  return node.nodeType === Node.TEXT_NODE;
}
