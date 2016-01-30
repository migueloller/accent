import getNextTextNode from './getNextTextNode.js';

/**
 * @param {Text} text
 * @param {number} offset
 * @param {boolean} [inclusive]
 * @returns {?Text}
 */
export default function getTextNodeFromOffset(text, offset, inclusive = false) {
  if (offset < 0) {
    return null;
  }

  if (offset === 0) {
    return text;
  }

  // count the length of all the text nodes until it gets to the offset.
  let charCount = 0;
  let current = text;
  while (current && (inclusive ? charCount < offset : charCount <= offset)) {
    charCount += current.textContent.length;

    if (inclusive ? charCount >= offset : charCount > offset) {
      return current;
    }

    current = getNextTextNode(current);
  }

  return null;
}
