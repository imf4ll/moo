import styled from 'styled-components';

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
    z-index: 999;
`;

export const Container = styled.div`
    z-index: 1000;
    position: absolute;
    top: 50%;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    background: #121212;
    padding: 1rem 0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: rgba(15, 15, 15, 90%);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    img {
        border-radius: 8px;
    }

    input[type="button"] {
        padding: 0.7rem 1rem;
        font-family: 'Inter', sans-serif;
        color: white;
        outline: none;
        border: none;
        border-radius: 6px;
        background: #AC6AFF;
        font-size: 11pt;
        font-weight: 500;
        margin-top: 0.5rem;
        transition: all ease 300ms;
        cursor: pointer;

        :hover {
            opacity: 0.8;
        }

        :disabled {
            opacity: 0.5;
        }
    }

    div {
        display: flex;
        align-items: center;
        gap: 0.6rem ;
        justify-content: center;
        width: 100%;

        p {
            color: white;
        }

        input {
            background: #252525;
            outline: none;
            border: none;
            font-family: 'Inter', sans-serif;
            font-size: 11pt;
            color: white;
            padding: 0.5rem;
            border-radius: 5px;
            width: 77.5%;
        }
    }
`;
