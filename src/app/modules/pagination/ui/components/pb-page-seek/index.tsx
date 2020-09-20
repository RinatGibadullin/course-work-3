import React, { useCallback, useState } from "react";
import UDInput from "../../../../ud-forms/form-input/input";

const isValidPage = (newPage: number, pagesCount: number): boolean => {
    return !Number.isNaN(newPage) && newPage >= 1 && newPage <= pagesCount;
};

type Props = {
    pagesCount: number
    onChange: (page: number) => void
}
const PBPageSeek = (props: Props) => {
    const [value, setValue] = useState<number|string>('');
    const { onChange, pagesCount } = props;

    const onKeydown = useCallback((event) => {
        if (event.key === 'Enter') {
            onChange(value as number);
            setValue('');
        }
    }, [onChange, value]);

    const onInputChange = useCallback((event) => {
        const newPage = Number(event.target.value);
        if (isValidPage(newPage, pagesCount)) {
            setValue(newPage);
        } else {
            setValue('');
        }
    }, [pagesCount]);

    return (
        <div className="d-inline-flex align-items-center">
            <p className="regular-text fs14 mx-3 my-0">К странице</p>
            <div style={{ width: "50px" }}>
                <UDInput
                    value={value}
                    onKeyDown={onKeydown}
                    onChange={onInputChange}
                    placeholder="№" />
            </div>
        </div>
    )
};

export default PBPageSeek;
