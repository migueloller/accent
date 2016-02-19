import DiffMatchPatch from 'diff-match-patch';
import { DMP_THRESHOLD, DMP_DISTANCE } from './../Constants.js';

/**
 * @param {string} source
 * @param {string} pattern
 * @param {number} location
 * @param {boolean} [word]
 * @returns {object}
 */
export default function fuzzyStringSearch(source, pattern, location, word = true) {
  const dmp = new DiffMatchPatch();

  dmp.Match_Threshold = DMP_THRESHOLD;
  dmp.Match_Distance = DMP_DISTANCE;
  dmp.Match_MaxBits = pattern.length;

  const start = dmp.match_main(source, pattern, location);
  if (start !== -1) {
    const end = start + pattern.length;
    return {
      match: word ? source.slice(start, end + source.slice(end).search(/\s/)) :
          source.slice(start, end),
      start,
    };
  }

  return null;
}
