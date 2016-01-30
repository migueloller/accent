/**
 * @param {Text} text
 * @returns {number}
 */
export default function bodyIndexOf(text) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  // count the length of all the text nodes before the input text
  let charCount = 0;
  while (walker.nextNode() && walker.currentNode !== text) {
    charCount += walker.currentNode.length;
  }

  return walker.currentNode === text ? charCount : -1;
}
