import styled from 'styled-components';

export const Container = styled.div`
    background-color: rgba(0, 0, 0, 90%);
    backdrop-filter: blur(2px);
    position: fixed;
    top: 0;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 3.25rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 999;

    .logo {
        display: flex;
        justify-content: center;
        transition: all ease 350ms;
        margin-left: 0.5rem;

        :hover {
            transform: scale(1.1);
            transform: rotate(90deg);
        }

        img:first-child {
            animation: infinite linear 4s breath;
            position: absolute;
            z-index: -1;
        }
    }

    @keyframes breath {
        0% {
            -webkit-filter: blur(0px);
        }

        50% {
            -webkit-filter: blur(6px);
        }

        100% {
            -webkit-filter: blur(0px);
        }
    }
    
    .searchBar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #181818;
        border-radius: 20px;
        padding: 0.4rem 0.6rem;
        width: 40%;
        position: absolute;
        right: 50%;
        left: 50%;
        transform: translateX(-50%);

        input {
            outline: none;
            border: none;
            background-color: transparent;
            width: 100%;
            color: white;
            font-size: 11pt;
        }
    }

    .bar-buttons {
        display: flex;
        gap: 0.25rem;

        img {
            transition: all ease 200ms;
            cursor: pointer;

            :hover {
                opacity: 0.7;
            }
        }
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.5rem;
        gap: 0.5rem;

        img {
            cursor: pointer;
            transition: all ease 300ms;

            :hover {
                opacity: 0.7;
            }
        }

        #downloading {
            animation: infinite linear downloading 2s;
        }

        @keyframes downloading {
            50% {
                transform: rotate(-360deg);
            }

            80% {
                transform: scale(1.1);
            }

            100% {
                transform: scale(1);
            }
        }
    }
`;
