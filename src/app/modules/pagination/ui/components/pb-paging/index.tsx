import React from "react";
import PBPagesList from "../pb-pages-list";

type Props = {
    pagesCount: number
    activePage: number
    onChange: (page: number) => void
}
const PBPaging = (props: Props) => {
        return (
            <div className="d-inline-flex align-items-center mr-7">
                <PBPagesList
                    pagesCount={props.pagesCount}
                    activePage={props.activePage} 
                    onChange={props.onChange}/>
            </div>
        )
    }
;

export default PBPaging;
