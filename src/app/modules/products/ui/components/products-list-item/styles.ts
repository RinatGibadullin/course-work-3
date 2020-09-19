import styled from 'styled-components';

export const StyledProductCard = styled.div`
    width: 250px;
    margin: 20px;
    padding: 5px;
    border-radius: 12px;
    transition: 0.3s;
    box-shadow: 0 8px 40px -12px rgba(0,0,0,0.3);
    &:hover {
        transform: scale(1.05)
    };
    cursor: pointer;
`;
