import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

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
