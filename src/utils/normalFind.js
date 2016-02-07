import normalIndexMap from './normalIndexMap';

/**
 * @param {string} source
 * @param {string} pattern
 * @param {number} [fromIndex]
 * @returns {?object}
 */
export default function normalFind(source, pattern, fromIndex = 0) {
  const regex = /\s+/g;

  const normalize = text => text.replace(regex, ' ');

  const nSource = normalize(source);
  const nPattern = normalize(pattern);
  const nIndex = nSource.indexOf(nPattern, nSource.slice(0, fromIndex).replace(regex, ' ').length);

  if (nIndex !== -1) {
    const start = normalIndexMap(source, regex, nIndex);
    const end = normalIndexMap(source, regex, nIndex + nPattern.length);

    return {
      match: source.slice(start, end),
      start,
    };
  }

  return null;
}
