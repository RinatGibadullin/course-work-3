import React from "react";

type Props = {
    onClick: () => void
    active: boolean
}
const PreviousPageIcon = (props: Props) => {
    return (
        <svg
            onClick={props.onClick}
            style={{ cursor: "pointer" }}
            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4L6 8L10 12" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
};

export default PreviousPageIcon;
