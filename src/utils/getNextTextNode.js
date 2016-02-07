/**
 * @param {Node} node
 * @returns {?Text}
 */
export default function getNextTextNode(node) {
  const walker = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);

  // get the walker to the input node
  while (walker.currentNode !== node) {
    walker.nextNode();
  }

  // iterate the walker until a text node is found
  while (walker.nextNode() && walker.currentNode.nodeType !== Node.TEXT_NODE);

  return walker.currentNode.nodeType === Node.TEXT_NODE ? walker.currentNode : null;
}
