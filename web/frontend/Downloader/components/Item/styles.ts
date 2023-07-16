import styled from "styled-components";

export const Container = styled.div`
    max-width: 256px;
    cursor: pointer;
    text-decoration: none;
    transition: all ease 300ms;
    
    :hover {
        transform: scale(1.05);
    }

    #thumbnail {
        display: flex;
        flex-direction: column;
        border-radius: 8px;

        p {
            align-self: end;
            position: relative;
            bottom: -75%;
            left: -1%;
            color: white;
            font-size: 9pt;
            background-color: rgb(0, 0, 0, 75%);
            text-align: center;
            display: inline-block;
            padding: 2px 4px;
            border-radius: 4px;
        }
    }

    #details {
        padding: 0 5px;
        margin-top: -0.5rem;

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
