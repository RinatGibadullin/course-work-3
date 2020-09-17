import React from "react";
import { StyledInput, StyledLgInput } from "./styles";
import UDErrorMessage from "../error-message/input";

const UDInput = ({input, meta, lg, icon, ...props}: any) => {
    const hasError = meta?.touched && meta?.error
    return (
        <>
            {lg ? <StyledLgInput hasError={hasError} {...input} {...props}/>
            : <StyledInput icon={icon} hasError={hasError} {...input} {...props}/>}
            {hasError && <UDErrorMessage error={meta.error}/>}
        </>
    )
};

export default UDInput;
