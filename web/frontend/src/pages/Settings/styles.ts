import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;

    p {
        font-weight: 500;
    }

    h1 {
        color: white;
        font-size: 20pt;
    }

    .options {
        width: 50%;
        display: flex;
        flex-direction: column;

        h3 {
            color: #CCC;
            font-weight: 500;
            text-align: center;
        }
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
        margin: 2rem 0 2rem 0;

        :hover {
            opacity: 0.75;
        }

        :disabled {
            opacity: 0.5;
        }
    }

    @media (max-width: 800px) {
        margin-top: 10%;

        .options {
            width: 95%;
        }

        .save {
            margin-top: 10%;
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
        outline: none;
        color: white;
        font-size: 11pt;
        height: 2.5rem;
    }

    @media (max-width: 800px) {
        div {
            gap: 0;
        }

        .name {
            font-size: 10pt;
            width: 50%;
        }

        .help {
            font-size: 9pt;
        }

        input {
            font-size: 10pt;
        }
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

    @media (max-width: 800px) {
        flex-direction: column;

        .name {
            font-size: 10pt;
        }

        .help {
            font-size: 9pt;
        }
    }
`;

export const ButtonOption = styled.div`
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

    input[type="button"] {
        background: transparent;
        border: none;
        padding: 0;
        color: #FF5C5C;
        font-weight: 500;
        font-size: 11pt;
        transition: all ease 300ms;
        cursor: pointer;

        :hover {
            opacity: 0.75;
        }
    }

    @media (max-width: 800px) {
        flex-direction: column;

        .name {
            font-size: 10pt;
        }

        .help {
            font-size: 9pt;
        }
    }
`;
