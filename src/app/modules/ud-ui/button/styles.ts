import styled from 'styled-components';

const StyledSubmitButton = styled.button.attrs({
    type: 'submit',
})`
    padding: ${(props: { size: string, colorType: string }) => {
        switch (props.size) {
            case "lg":
                return "13px 25px";
            case "md":
                return "7px 16px";
            case "sm":
                return "4px 10px"
            default:
                return "7px 16px"
        }
    }};
    border-radius: 4px;
    border: none;
    background-color: ${(props: { size: string, colorType: string }) => {
        switch (props.colorType) {
            case "error":
                return "#E61739";
            default:
                return "#0055FF"
        }
    }};
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    color: white;
    outline: none;
    /* &:hover {
        background-color: #34AFF9;
        border: none;
    };
    &:focus {
        background-color: #098EDF;
        outline: none;
    }; */
    &:disabled {
        cursor: none;
        color: #9D9FB5;
        background: #F2F4F7;
    };
`;
export const OutlinedButton = styled(StyledSubmitButton)`
    border: 1px solid #0055FF;
    background-color: #FFFFFF;
    color: #0055FF;
    &:focus {
        background-color: #FFFFFF;
        outline: none;
    };
`;
export default StyledSubmitButton;
