import styled from 'styled-components';

export const Container = styled.div`
    .notifications {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        cursor: pointer;
        transition: all ease 300ms;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .new {
            animation: linear infinite 500ms breath;
            position: absolute;
        }

        @keyframes breath {
            0% {
                -webkit-filter: blur(0px);
            }

            50% {
                -webkit-filter: blur(2px);
            }

            100% {
                -webkit-filter: blur(0px);
            }
        }
    };
`;

export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #171717;
    border-radius: 10px;
    width: 25vw;
    height: 80vh;
    position: absolute;
    top: 2.5rem;
    right: 0.5rem;
    z-index: 1000;
    overflow-y: auto;

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
