import getTextNodeFromOffset from './../utils/getTextNodeFromOffset.js';
import getNextTextNode from './../utils/getNextTextNode.js';
import bodyIndexOf from './../utils/bodyIndexOf.js';

/**
 * @param {string} searchValue
 * @param {number} [fromIndex]
 * @returns {?Range}
 */
export default function findRange(searchValue, fromIndex = 0) {
  const index = document.body.textContent.indexOf(searchValue, fromIndex);

  if (index !== -1) {
    const startContainer = getTextNodeFromOffset(getNextTextNode(document.body), index);
    const startOffset = index - bodyIndexOf(startContainer);
    const endContainer = getTextNodeFromOffset(startContainer, startOffset + searchValue.length, true);
    const endOffset = startContainer === endContainer ?
        startOffset + searchValue.length : bodyIndexOf(startContainer) +
        startOffset + searchValue.length - bodyIndexOf(endContainer);

    const range = document.createRange();
    range.setStart(startContainer, startOffset);
    range.setEnd(endContainer, endOffset);

    return range;
  }

  return null;
}
