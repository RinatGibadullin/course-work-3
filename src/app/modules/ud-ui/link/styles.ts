import styled from 'styled-components';

const StyledLink = styled.a.attrs(props => ({
    href: props.href
}))`
    color: ${(props: { active: boolean }) =>
        props.active
            ? "#0B1047"
            : "#0055FF"
    };
`;

export default StyledLink;
