/**
 * @param {Range} range
 * @param {Node} node
 * @returns {boolean}
 */
export default function rangeIntersectsNode(range, node) {
  const nodeRange = document.createRange();

  nodeRange.selectNode(node);

  return range.compareBoundaryPoints(Range.END_TO_START, nodeRange) === -1 &&
      range.compareBoundaryPoints(Range.START_TO_END, nodeRange) === 1;
}
