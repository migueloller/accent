import isText from './../utils/isText.js';

/**
 * @param {Range} range
 * @returns {Range}
 */
export default function splitRangeBoundaries(range) {
  if (isText(range.startContainer)) {
    if (range.startOffset > 0) {
      range.setStart(range.startContainer.splitText(range.startOffset), 0);
    }
  }

  if (isText(range.endContainer)) {
    if (range.endOffset < range.endContainer.length) {
      range.endContainer.splitText(range.endOffset);
    }
  }

  return range;
}
