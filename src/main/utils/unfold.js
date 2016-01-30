/**
 * @param {HTMLElement} wrapper
 */
export default function unfold(wrapper) {
  const parent = wrapper.parentNode;
  const children = wrapper.childNodes;

  while (children.length > 0) {
    parent.insertBefore(children[0], wrapper);
  }

  parent.removeChild(wrapper);
}
