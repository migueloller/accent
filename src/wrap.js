/**
 * @param {Node} node
 * @returns {HTMLElement}
 */
export default function wrap(node, wrapper) {
  const parent = node.parentNode;
  const sibling = node.nextSibling;

  wrapper.appendChild(node);

  if (parent) {
    parent.insertBefore(wrapper, sibling);
  }

  return wrapper;
}
