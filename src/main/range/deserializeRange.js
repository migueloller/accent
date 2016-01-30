import evaluateXPath from './../xpath/evaluateXPath.js';
import isText from './../utils/isText.js';
import getWholeTextUpTo from './../utils/getWholeTextUpTo.js';

/**
 * @param {string} serializedRange
 * @returns {?Range} range
 */
export default function deserializeRange(serializedRange) {
  const json = JSON.parse(serializedRange);
  const so = json.startOffset;
  const sc = evaluateXPath(json.startContainer, so);
  const eo = json.endOffset;
  const ec = evaluateXPath(json.endContainer, eo);
  const range = document.createRange();

  try {
    range.setStart(sc, isText(sc) ? so - getWholeTextUpTo(sc).length : so);
    range.setEnd(ec, isText(ec) ? eo - getWholeTextUpTo(ec).length : eo);
  } catch (e) {
    return null;
  }

  return range;
}
