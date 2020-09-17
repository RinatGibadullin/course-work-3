import React from "react";
import StyledLink from "./styles";

type Props = {
    href: string
    label: string
    active?: boolean
    onClick?: () => void
}
const UDLink = (props: Props) => {
    const { href, label, active, ...other } = props;
    return (
        <StyledLink href={href} active={active} {...other}>
            <p className={(active ? "bold-text " : "regular-text ") + "fs16 my-0"}>{label}</p>
        </StyledLink>
    )
};

export default UDLink;
