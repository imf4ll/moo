import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2%;
    width: 100%;
`;

export const Items = styled.div`
    max-width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    overflow-y: auto;

    @media (max-width: 800px) {
        width: 100%;
        margin-top: 5%;
    }
`;
