import styled from 'styled-components';

export const Background = styled.div`
    background-color: #000;
    opacity: 0.9;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 99%;
    height: 100%;
    z-index: 999;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #171717;
    border-radius: 10px;
    width: 25%;
    height: 80%;
    position: absolute;
    top: 2.5rem;
    right: 0.5rem;
    z-index: 1000;
    overflow-y: scroll;

    .notification-new {
        background: #232323;
        border-radius: 10px 10px 0 0;
    }

    .notification, .notification-new {
        color: white;
        font-weight: 400;
        font-size: 11pt;
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        padding-left: 0.75rem;
        cursor: default;
        user-select: none;
        transition: all ease 300ms;

        :hover {
            opacity: 0.6;
        }

        :first-child {
            p:first-child {
                margin-top: 0.75rem;
            }
        }

        :not(:first-child) {
            margin-top: -0.2rem;
        }

        .timestamp {
            color: #AAA;
            font-size: 10pt;
            font-weight: 500;
            margin-top: -0.5rem;
        }
    }
`;
