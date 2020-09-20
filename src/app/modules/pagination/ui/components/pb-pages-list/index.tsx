import NextPageIcon from "assets/icons/NextPageIcon";
import PreviousPageIcon from "assets/icons/PreviousPageIcon";
import React from "react";
import UDLink from "../../../../ud-ui/link/link";
import { usePages } from "./use-pages";

type Props = {
    pagesCount: number
    activePage: number
    maxSize: number
    rotate: boolean
    ellipses: boolean
    boundaryLinks: boolean
    directionLinks: boolean
    onChange: (page: number) => void
}
const PBPagesList = (props: Props) => {
    const {
        activePage, onChange, pagesCount,
        maxSize, rotate, ellipses, directionLinks,
        boundaryLinks
    } = props;

    const { pages, currentPage, hasPrevious, hasNextPage } = usePages({
        pagesCount,
        activePage,
        maxSize,
        rotate,
        ellipses,
        onChange,
    });
    return (
        <div className="d-inline-flex align-items-center">
            {boundaryLinks && (
                <div className="mx-1 my-0">
                    <UDLink
                        href="#"
                        onClick={() => onChange(1)}
                        label="&laquo;"
                        active={!hasPrevious} />
                </div>
            )}
            {directionLinks && (
                <div className="row align-items-center mx-1">
                    <PreviousPageIcon
                        onClick={() => onChange(currentPage - 1)}
                        active={!hasPrevious}
                    />
                </div>
            )}
            {pages.map((pageNumber: number) => {
                const isEllipsis = pageNumber === -1;
                if (isEllipsis) {
                    return (
                        <div key={pageNumber} className="mx-1 my-0">
                            <UDLink href="#" label="..." />
                        </div>
                    );
                }
                return (
                    <div key={pageNumber} className="mx-1 my-0">
                        <UDLink
                            href="#"
                            onClick={() => onChange(pageNumber)}
                            label={pageNumber.toString()}
                            active={pageNumber === activePage} />
                    </div>
                )
            })}
            {directionLinks && (
                <div className="row align-items-center mx-1">
                    <NextPageIcon
                        onClick={() => onChange(currentPage + 1)}
                        active={!hasNextPage}
                    />
                </div>
            )}
            {boundaryLinks && (
                <div className="mx-1 my-0">
                    <UDLink
                        href="#"
                        onClick={() => onChange(pagesCount)}
                        label="&raquo;"
                        active={!hasNextPage} />
                </div>
            )}
        </div>
    );
};

PBPagesList.defaultProps = {
    maxSize: 1,
    rotate: true,
    ellipses: true,
    boundaryLinks: false,
    directionLinks: true
}

export default PBPagesList;
