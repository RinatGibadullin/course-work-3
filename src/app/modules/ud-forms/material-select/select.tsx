import React, { FC } from "react";
import UDErrorMessage from "../error-message/input";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

type SelectProps = {
    options: OptionsObject[]
}

type OptionsObject = {
    value: string,
    label: string
}

type InputProps = {
    input: any,
    meta: any
}

const UDMaterialSelect: FC<SelectProps & InputProps> = ({ options, input, meta, ...props }) => {

    const hasError = meta?.touched && meta?.error
    return (
        <>
            <FormControl variant="outlined" fullWidth {...input} {...props}>
                {/* <InputLabel>{label}</InputLabel> */}
                <Select
                    // label={label}
                    // {...input} {...props}
                >
                    {options?.map((option, index) =>
                        <MenuItem
                            key={index}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            {hasError && <UDErrorMessage error={meta.error} />}
        </>
    )
};

export default UDMaterialSelect;
