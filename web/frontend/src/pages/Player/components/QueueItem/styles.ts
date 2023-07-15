import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    color: white;
    font-size: 11pt;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    transition: all ease 150ms;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;

    :hover {
        background: #111;
    }

    .title {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .stats {
        display: flex;
        gap: 5rem;
    }

    .thumb {
        display: flex;
        margin: 0;
        gap: 1rem;
        align-items: center;

        p {
            font-weight: 500;
        }

        .thumbnail {
            border-radius: 10px;
            width: 80px;
            height: 80px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 140px;
        }
    }

    p {
        font-weight: 500;
    }

    span {
        color: #AAA;
        font-weight: 400;
    }
`;
