/**
 * @param {string} text
 * @param {RegExp} test
 * @param {number} normalIndex
 * @returns {number}
 */
export default function fuzzyIndexMap(text, test, normalIndex) {
  let buffer = text;
  let counter = normalIndex;
  const regex = new RegExp(`^${test.source}`);
  let actualIndex = 0;
  let match;

  while (buffer.length !== 0 && counter--) {
    match = buffer.match(regex);
    if (match && match[0]) {
      actualIndex += match[0].length;
      buffer = buffer.replace(regex, '');
    } else {
      actualIndex++;
      buffer = buffer.slice(1);
    }
  }

  return actualIndex;
}
