import styled from 'styled-components';

export const Container = styled.div`
    padding-bottom: 4.5rem;
    overflow: hidden;

    .items {
        width: 95%;
        margin-left: 3rem;
        margin-top: 3rem;
        padding: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
    }

    .spinner {
        position: absolute;
        left: 50%;
        right: 50%;
        top: 4rem;
    }
`;
