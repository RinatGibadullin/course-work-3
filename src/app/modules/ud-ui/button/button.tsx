import React from "react";
import StyledSubmitButton, { OutlinedButton } from './styles'

type buttonProps = {
    label: string,
    href?: string,
    disabled?: boolean,
    onClick?: () => void,
    size?: 'sm' | 'lg' | 'md',
    outlined?: boolean,
    color?: 'info' | 'error'
};

const UDButton = (props: buttonProps) => {
    if (props.outlined) {
        return (
            <OutlinedButton colorType={props.color} size={props.size} onClick={props.onClick}
                disabled={props.disabled}>
                <p className="regular-text fs14 m-0 mr-1">{props.label}</p>
            </OutlinedButton>
        )
    } else {
        return (
            <StyledSubmitButton colorType={props.color} size={props.size} onClick={props.onClick}
                disabled={props.disabled}>
                <p className="semibold-text fs16 m-0 mr-1">{props.label}</p>
            </StyledSubmitButton>
        )
    }
};

export default UDButton;
