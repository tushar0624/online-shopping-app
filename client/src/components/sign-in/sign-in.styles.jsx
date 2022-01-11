import styled from "styled-components";

export const SignInContainer = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 880px) {
        width: -webkit-fill-available;
    }
`;

export const SignInTitle = styled.h2`
    margin: 10px 0;
`;

export const ButtonsBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;