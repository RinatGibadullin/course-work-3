import Button from "@material-ui/core/Button/Button";
import React from "react";

type buttonProps = {
    label: string,
    href?: string,
    disabled?: boolean,
    onClick?: () => void,
    size?: 'sm' | 'lg' | 'md',
    outlined?: boolean,
    color?: 'info' | 'error'
    icon?: any
};

const UDMaterialButton = (props: buttonProps) => {
    return (
        <Button onClick={props.onClick} href={props.href}>
            {props.icon}
            {props.label}
        </Button>
    )
};

export default UDMaterialButton;
