import React from "react";

type Props = {
    total: number
}
const PBTotal = (props: Props) => {
    return (
        <div className="d-inline-flex align-items-center mx-6">
            <p className="regular-text fs14 mr-2 my-0">Элементов:</p>
            <p className="semibold-text fs16 my-0">{props.total}</p>
        </div>
    )
};

export default PBTotal;
