import React from "react";
import PBTotal from "../pb-total";
import PBPerPage from "../pb-per-page";
import PBPaging from "../pb-paging";
import PBPageSeek from "../pb-page-seek";
import { PaginationBarOptions } from "app/modules/pagination/PaginationBarOptions";

const defaultOptions: PaginationBarOptions = {
    perPageSet: [30, 50, 100]
}

type Props = {
    total: number
    page: number
    perPage: number
    onPageChange?: (page: number) => void
    onPerPageChange?: (page: number) => void
    options?: PaginationBarOptions
}
const PaginationBar = (props: Props) => {
    const { total, perPage, options, onPerPageChange, onPageChange, page } = props;
    const pagesCount = Math.ceil(total / perPage);
    const hasOtherPages = !Number.isNaN(pagesCount) && pagesCount > 1;

    return (
        <div className="d-inline-flex align-items-center">
            <PBTotal total={total} />
            <PBPerPage
                activePerPage={perPage}
                perPages={options?.perPageSet}
                onChange={onPerPageChange} />
            {hasOtherPages && (
                <>
                    <PBPaging
                        activePage={page}
                        onChange={onPageChange}
                        pagesCount={pagesCount} />
                    <PBPageSeek 
                        pagesCount={pagesCount}
                        onChange={onPageChange} />
                </>
            )}
        </div>
    )
};

PaginationBar.defaultProps = {
    options: defaultOptions,
    onPageChange: () => { },
    onPerPageChange: () => { }
};

export default PaginationBar;
