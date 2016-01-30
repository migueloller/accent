import getXPath from './../xpath/getXPath.js';
import isText from './../utils/isText.js';
import getWholeTextUpTo from './../utils/getWholeTextUpTo.js';

/**
 * @param {Range} range
 * @returns {string}
 */
export default function serializeRange(range) {
  const sc = range.startContainer;
  const so = range.startOffset;
  const ec = range.endContainer;
  const eo = range.endOffset;

  return JSON.stringify({
    startContainer: getXPath(sc),
    startOffset: isText(sc) ? getWholeTextUpTo(sc).length + so : so,
    endContainer: getXPath(ec),
    endOffset: isText(ec) ? getWholeTextUpTo(ec).length + eo : eo,
  });
}
