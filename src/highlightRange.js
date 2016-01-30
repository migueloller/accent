import splitRangeBoundaries from './splitRangeBoundaries.js';
import getRangeTextNodes from './getRangeTextNodes.js';
import wrap from './wrap.js';
import {HIGHLIGHT_TAG} from './constants.js';
import unfold from './unfold.js';

/**
 * @param {Range} range
 * @returns {HTMLElement[]}
 */
export default function highlightRange(range) {
  return getRangeTextNodes(splitRangeBoundaries(range)).map(textNode => {
    return wrap(textNode, document.createElement(HIGHLIGHT_TAG));
  }).filter(wrapper => {
    // This fixes some formatting issues with table wrappers by getting rid of
    // highlights with no width and height or no text.
    if ((wrapper.offsetWidth === 0 && wrapper.offsetHeight === 0) || !wrapper.textContent) {
      unfold(wrapper);
      return false;
    }

    return true;
  });
}
