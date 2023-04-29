import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3%;

    p {
        font-weight: 500;
    }

    h1 {
        color: white;
        font-size: 20pt;
    }

    .options {
        width: 50%;
        margin-top: 1%;
        display: flex;
        flex-direction: column;
    }

    .save {
        background-color: #9361FF;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.75rem;
        color: white;
        font-weight: 500;
        font-size: 11pt;
        transition: all ease 300ms;
        cursor: pointer;
        margin-top: 4%;

        :hover {
            opacity: 0.75;
        }

        :disabled {
            opacity: 0.5;
        }
    }

    .back {
        color: white;
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        cursor: pointer;
        transition: all ease 300ms;
        background-color: transparent;
        border: none;
        font-size: 12pt;

        :hover {
            opacity: 0.75;
        }
    }
`;

export const TextOption = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    div {
        display: flex;
        gap: 1rem;
    }

    .name {
        font-size: 12pt;
        color: white;
    }

    .help {
        color: #AAA;
        font-size: 10.5pt;
    }

    input {
        background-color: #1A1A1A;
        border: none;
        border-radius: 8px;
        padding-left: 0.75rem;
        width: 100%;
        outline: none;
        color: white;
        font-size: 11pt;
        height: 2.5rem;
    }
`;

export const SwitchOption = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    .name {
        font-size: 12pt;
        color: white;
    }

    .help {
        color: #AAA;
        font-size: 10.5pt;
    }

    input[type="checkbox"] {
        background-color: red;
    }
`;
