import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    text-decoration: none;
    transition: all ease 300ms;
    display: flex;
    gap: 0.5rem;

    :hover {
        transform: scale(1.01);
    }

    #thumbnail {
        display: flex;
        flex-direction: column;
        background-size: cover;

        p {
            align-self: end;
            position: relative;
            bottom: -77.5%;
            color: white;
            font-size: 9pt;
            background-color: rgb(0, 0, 0, 75%);
            text-align: center;
            display: inline-block;
            padding: 2px 3px;
        }
    }

    #details {
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
`;
