import styled from 'styled-components';

export const Back = styled.img`
    position: absolute;
    top: 1rem;
    left: 0.75rem;
    transition: all ease 300ms;
    cursor: pointer;

    :hover {
        opacity: 0.6;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;

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
