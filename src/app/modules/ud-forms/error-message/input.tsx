import React from "react";
import { ErrorText } from "./styles";

type Props = {
    error?: string
};
const UDErrorMessage = (props: Props) => {
    const { error } = props;
    if (error != null && error !== '') {
        return (<ErrorText className="regular-text fs12">{error}</ErrorText>)
    }
    return null;
};

export default UDErrorMessage;
