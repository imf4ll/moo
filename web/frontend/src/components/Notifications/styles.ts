import styled from 'styled-components';

export const Container = styled.div`
    .notifications {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        transition: all ease 300ms;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            transition: all ease 500ms;
            cursor: pointer;

            :hover {
                opacity: 0.7;
            }
        }

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
    border-radius: 10px;
    width: 25vw;
    height: 80vh;
    position: absolute;
    top: 2.5rem;
    right: 0.5rem;
    z-index: 100;
    overflow-y: auto;
    background-color: rgba(18, 18, 18, 95%);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

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
