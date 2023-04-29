import styled from 'styled-components';

export const Background = styled.div`
    background-color: #000;
    opacity: 0.9;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 99%;
    height: 100%;
    z-index: 999;
`;

export const Container = styled.div`
    position: absolute;
    top: 0;
    right: -50%;
    transition: all ease 500ms;
    width: 35%;
    height: 100%;
    background-color: #1A1A1A;
    border-radius: 10px 0 0 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title-queue {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;

        img {
            cursor: pointer;
            transition: all ease 300ms;

            :hover {
                opacity: 0.75;
            }
        }
    }

    h1 {
        font-size: 16pt;
        color: white;
    }

    .items {
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        margin-bottom: 1rem;
    }


    *::-webkit-scrollbar {
        background-color: rgb(12, 12, 12);
        width: 8px;
        border-radius: 15px;
    }

    *::-webkit-scrollbar-thumb {
        border-radius: 15px;
    }

    @media (max-width: 800px) {
        width: 100%;
        border-radius: 0;

        .items {
            width: 95%;
        }

        #close {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
        }
    }
`;
