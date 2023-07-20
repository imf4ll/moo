import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    h3 {
        color: white;
        font-weight: 400;
        margin-top: 3rem;
    }

    @media (max-width: 800px) {
        h3 {
            font-size: 10pt;
            width: 80%;
            text-align: center;
        }
    }
`;
