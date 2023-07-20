import styled from 'styled-components';

export const Container = styled.div`
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
