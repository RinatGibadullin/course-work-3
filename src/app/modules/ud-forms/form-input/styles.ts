import styled from 'styled-components';

type InputProps = {
    hasError: boolean,
    icon: any
}
export const StyledInput = styled.input`
    ${(props: InputProps) =>
        props.hasError
            ? "border: 2px solid #D91513"
            : "border: none"
    };
    outline: none;
    border: 1px solid #CECFDA;
    border-radius: 4px;
    background-color: transparent;
    width: 100%;
    height: 36px; 
    padding: 12px 16px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;
    background: url(${(props: InputProps) => props.icon}) no-repeat;
    background-position: right 14px top 50%;
`;

export const StyledLgInput = styled(StyledInput)`
    padding: 14px 16px;
`;
