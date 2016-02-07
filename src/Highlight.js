import isText from './utils/isText.js';
import getNextTextNode from './utils/getNextTextNode.js';
import serializeRange from './range/serializeRange.js';
import highlightRange from './range/highlightRange.js';
import bodyIndexOf from './utils/bodyIndexOf.js';
import deserializeRange from './range/deserializeRange.js';
import unfold from './utils/unfold.js';

export default class Highlight {
  /**
   * @param {Range} range
   */
  constructor(range) {
    const sc = range.startContainer;
    const isStartText = isText(range.startContainer);
    const firstTextNode = isStartText ? sc : getNextTextNode(sc);

    this.text = range.toString();
    this.index = bodyIndexOf(firstTextNode) + (isStartText ? range.startOffset : 0);
    this.range = serializeRange(range);
    this.nodes = [];

    this.mount();
  }

  /**
   * @returns {boolean}
   */
  mount() {
    this.unmount();

    const range = deserializeRange(this.range);

    if (range && range.toString() === this.text) {
      this.nodes = highlightRange(range);
      document.normalize();
      return true;
    }

    return false;
  }

  unmount() {
    this.nodes.forEach(unfold);
    document.normalize();
    this.nodes = [];
  }

  /**
   * @param {string} event
   * @param {function} handler
   */
  on(event, handler) {
    this.nodes.forEach(node => {
      node.addEventListener(event, handler);
    });
  }

  /**
   * @param {string} event
   * @param {function} handler
   */
  off(event, handler) {
    this.nodes.forEach(node => {
      node.removeEventListener(event, handler);
    });
  }

  /**
   * @returns {object}
   */
  getBoundingClientRect() {
    const rects = this.nodes.map(node => node.getBoundingClientRect());

    const getBound = (side, op) => op(...rects.map(rect => rect[side]));

    const top = getBound('top', Math.min);
    const right = getBound('right', Math.max);
    const bottom = getBound('bottom', Math.max);
    const left = getBound('left', Math.min);

    return { top, right, bottom, left };
  }

  scrollIntoView() {
    const highlightRect = this.getBoundingClientRect();

    if (highlightRect) {
      const documentRect = document.documentElement.getBoundingClientRect();

      scrollTo(highlightRect.left - documentRect.left, highlightRect.top - documentRect.top);
    }
  }

  /**
   * @param {string} className
   */
  addClass(className) {
    this.nodes.forEach(node => {
      node.classList.add(className);
    });
  }

  /**
   * @param {string} className
   */
  removeClass(className) {
    this.nodes.forEach(node => {
      node.classList.remove(className);
    });
  }

  /**
   * @param {string} className
   * @returns {boolean}
   */
  hasClass(className) {
    return this.nodes.some(node => node.classList.contains(className));
  }

  /**
   * @param {string} className
   * @returns {boolean}
   */
  toggleClass(className) {
    this.nodes.forEach(node => {
      node.classList.toggle(className);
    });

    return this.hasClass(className);
  }

  /**
   * @param {string} name
   * @returns {boolean}
   */
  hasAttribute(name) {
    return this.nodes.some(node => node.hasAttribute(name));
  }

  /**
   * @param {string} name
   * @returns {?string}
   */
  getAttribute(name) {
    if (this.hasAttribute(name)) {
      for (const node of this.nodes) {
        if (node.hasAttribute(name)) {
          return node.getAttribute(name);
        }
      }
    }

    return null;
  }

  /**
   * @param {string} name
   * @param {string} [value]
   */
  setAttribute(name, value = '') {
    this.nodes.forEach(node => {
      node.setAttribute(name, value);
    });
  }

  /**
   * @param {string} name
   */
  removeAttribute(name) {
    this.nodes.forEach(node => {
      node.removeAttribute(name);
    });
  }
}
