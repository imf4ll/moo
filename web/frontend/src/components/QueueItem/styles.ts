import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    .information {
        display: flex;
    }

    .thumbnail {
        img {
            border-radius: 6px;
        }
    }

    .details {
        margin-left: 0.5rem;

        p {
            word-break: break-all;
        }

        .title {
            font-weight: 500;
            color: #EEE;
            font-size: 11pt;
        }

        .author-views {
            font-weight: 400;
            font-size: 10.5pt;
            color: #CCC;
            margin-top: -0.5rem;
        }
    }

    .status {
        margin-right: 0.5rem;
    }

    #downloading {
        animation: downloading infinite 500ms;
    }

    @keyframes downloading {
        50% {
            margin-top: -5px;
        }

        100% {
            margin-top: 0;
        }
    }

    @media (max-width: 800px) {
        .status {
            margin: 0;
            width: 20px;
        }

        .details {
            max-width: 55%;

            .title {
                font-size: 9pt;
            }

            .author-views {
                font-size: 8pt;
            }
        }
    }
`;
