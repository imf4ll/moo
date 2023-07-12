import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    bottom: 3.5rem;
    right: 0.75rem;
    width: 30vw;
    height: 60vh;
    background: #181818;
    border-radius: 10px;
    z-index: 999;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow: auto;

    .item {
        display: flex;
        color: white;
        font-size: 11pt;
        font-weight: 500;
        gap: 0.5rem;
        margin: 0 0.5rem;
        align-items: center;

        :first-child {
            background: #252525;
            border-radius: 10px;
            padding: 0.25rem 0.4rem;
        }

        span {
            color: #AAA;
        }

        img {
            border-radius: 10px;
        }
    }
`;
