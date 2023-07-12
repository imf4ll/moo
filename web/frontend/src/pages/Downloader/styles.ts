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


    @keyframes animate {
        0% {
            transform: rotate(15deg);
        }

        10% {
            transform: rotate(0deg);
        }

        20% {
            transform: rotate(-15deg);
        }

        30% {
            transform: rotate(0deg);
        }
    }
`;

export const Items = styled.div`
    max-width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 800px) {
        width: 100%;
        margin-top: 5%;
    }
`;
