import styled from 'styled-components';

export const Back = styled.input`
    position: absolute;
    top: 0.75rem;
    left: 0.5rem;
    background: transparent;
    transition: all ease 250ms;
    cursor: pointer;
    outline: none;
    border: none;
    font-weight: 500;
    font-size: 12pt;
    z-index: 2002;

    :hover {
        opacity: 0.7;
    }
`;

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    z-index: 2001;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #000;

    .title {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    
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
