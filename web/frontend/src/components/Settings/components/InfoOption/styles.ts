import styled from 'styled-components';

export const Container = styled.div`
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

    .child {
        display: flex;
        flex-direction: column;
        gap: 0;
        margin-top: -1rem;

        p {
            color: #DDD;
            font-size: 10.5pt;
        }

        .uptodate {
            color: #AC6AFF;
        }

        .update {
            color: #FF5C5C;
            text-decoration: none;
            transition: all ease 500ms;

            :hover {
                opacity: 0.85;
            }
        }
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
