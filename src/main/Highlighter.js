import Highlight from './Highlight.js';
import Queue from './utils/Queue.js';
import findRange from './range/findRange.js';
import normalFind from './utils/normalFind.js';
import deserializeRange from './range/deserializeRange.js';
import fuzzyStringSearch from './utils/fuzzyStringSearch.js';

class Highlighter {
  queue = new Queue();

  /**
   * @param {Range} range
   * @returns {Highlight}
   */
  async highlightFromRange(range) {
    // clone the range before queing in case it changes
    const clone = range.cloneRange();

    return await this.queue.add(() => {
      return new Highlight(clone);
    });
  }

  /**
   * @returns {?Highlight}
   */
  async highlightCurrentSelection() {
    // get the selection before queing in case the user deselects
    const sel = getSelection();

    if (sel.rangeCount > 0) {
      // clone the range before queing in case it changes
      const range = sel.getRangeAt(0).cloneRange();

      return await this.queue.add(() => {
        sel.removeAllRanges();
        return new Highlight(range);
      });
    }

    return null;
  }

  /**
   * @param {string} searchValue
   * @param {number} [fromIndex]
   * @returns {?Highlight}
   */
  async highlightFromString(searchValue, fromIndex = 0) {
    return await this.queue.add(() => {
      let range = findRange(searchValue, fromIndex);

      if (range) {
        return new Highlight(range);
      }

      // try normalizing all whitespace and searching
      const result = normalFind(document.body.textContent, searchValue, fromIndex);
      if (result) {
        range = findRange(result.match, result.start);

        if (range) {
          return new Highlight(range);
        }
      }

      return null;
    });
  }

  /**
   * @param {object} json
   * @param {string} json.range
   * @param {string} json.text
   * @param {number} json.index
   * @returns {?Highlight}
   */
  async highlightFromJson(json) {
    // clones the object before queing in case it changes
    const clone = JSON.parse(JSON.stringify(json));

    return await this.queue.add(() => {
      let range = deserializeRange(clone.range);

      if (range && range.toString() === clone.text) {
        return new Highlight(range);
      }

      const result = fuzzyStringSearch(document.body.textContent, clone.text, clone.index);
      if (result) {
        range = findRange(result.match, result.start);

        if (range) {
          return new Highlight(range);
        }
      }

      return null;
    });
  }
}

// Not using es6 `export` because of issues with Browserify standalone options.
module.exports = Highlighter;
