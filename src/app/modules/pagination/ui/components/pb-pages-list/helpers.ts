export function toInteger(value: any) {
  return parseInt("" + value, 10);
}

export function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

export function getValueInRange(value: number, max: number, min: number): number {
  if (min === void 0) { min = 0; }
  return Math.max(Math.min(value, max), min);
}


export function applyRotation(pagesCount: number, maxSize: number, page: number) {
  let start = 0;
  let end = pagesCount;
  const leftOffset = Math.floor(maxSize / 2);
  const rightOffset = maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
  if (page <= leftOffset) {
      // very beginning, no rotation -> [0..maxSize]
      end = maxSize;
  }
  else if (pagesCount - page < leftOffset) {
      // very end, no rotation -> [len-maxSize..len]
      start = pagesCount - maxSize;
  }
  else {
      // rotate
      start = page - leftOffset - 1;
      end = page + rightOffset;
  }
  return [start, end];
};

export function applyEllipses(ellipses: boolean, pages: number[], pagesCount: number, start: number, end: number) {
  if (ellipses) {
      if (start > 0) {
          if (start > 1) {
              pages.unshift(-1);
          }
          pages.unshift(1);
      }
      if (end < pagesCount) {
          if (end < (pagesCount - 1)) {
              pages.push(-1);
          }
          pages.push(pagesCount);
      }
  }
};