import styled from 'styled-components';

export const Container = styled.div`
    background-color: rgba(0, 0, 0, 95%);
    border-bottom: 1px solid #222;
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    width: 98%;
    height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 999;

    .notifications {
        margin-top: 0.25rem;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: -0.75rem;

        img {
            cursor: pointer;
            transition: all ease 300ms;

            :hover {
                opacity: 0.7;
            }
        }
    }

    .logo {
        display: flex;
        justify-content: center;
        transition: all ease 350ms;
        margin-left: -0.5rem;

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
        background-color: #161616;
        border-radius: 5px;
        padding: 0.3rem 0.45rem;
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
            font-family: 'Inter', sans-serif;
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
`;
