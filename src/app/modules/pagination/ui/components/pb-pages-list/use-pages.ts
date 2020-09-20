import { useState, useEffect } from "react";
import { isNumber, getValueInRange, applyRotation, applyEllipses } from "./helpers";

type Props = {
  pagesCount: number
  activePage: number
  maxSize: number
  rotate: boolean
  ellipses: boolean
  onChange: (page: number) => void
}
export function usePages(options: Props) {
  const { pagesCount, activePage, onChange, maxSize, rotate, ellipses } = options;
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>();

  const hasPrevious = currentPage > 1;
  const hasNextPage = currentPage < pagesCount;

  useEffect(() => {
    let count = pagesCount;
    if (!isNumber(pagesCount)) {
      count = 0;
    }

    let list = Array.from(Array(count), (_, i) => i + 1);

    // set page in range
    const prevPageNo = currentPage;
    const newCurrentPage = getValueInRange(activePage, pagesCount, 1);
    if (Number(newCurrentPage) !== Number(prevPageNo) && !isNaN(newCurrentPage)) {
      setCurrentPage(newCurrentPage);
      onChange(newCurrentPage);
    }

    let _a;
    let _b;
    if (maxSize > 0 && pagesCount > maxSize) {
      let start = 0;
      let end = pagesCount;
      if (rotate) {
        _a = applyRotation(pagesCount, maxSize, newCurrentPage);
        start = _a[0];
        end = _a[1];
      } else {
        _b = applyRotation(pagesCount, maxSize, newCurrentPage);
        start = _b[0];
        end = _b[1];
      }

      list = list.slice(start, end);
      applyEllipses(ellipses, list, pagesCount, start, end);
      setPages(list);
    };

  }, [pagesCount, activePage, rotate, maxSize, ellipses]);

  return { pages, currentPage, hasPrevious, hasNextPage }
}