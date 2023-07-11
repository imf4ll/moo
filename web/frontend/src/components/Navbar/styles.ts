import styled from 'styled-components';

export const Container = styled.div`
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 3rem;
    height: 100%;
    background: #1a1a1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0px 8px 8px 0px;

    nav {
        width: 80%;
        height: 98%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .logo {
            width: 100%;
            display: flex;
            justify-content: center;
            cursor: pointer;
            transition: all ease 350ms;
            margin-bottom: 0.75rem;

            :hover {
                transform: scale(1.1);
                transform: rotate(90deg);
            }

            img:first-child {
                animation: infinite linear 2s breath;
                position: absolute;
                z-index: -1;
            }
        }

        @keyframes breath {
            0% {
                -webkit-filter: blur(0px);
            }

            50% {
                -webkit-filter: blur(4px);
            }

            100% {
                -webkit-filter: blur(0px);
            }
        }

        .button {
            width: 100%;
            height: 2.5rem;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all ease 300ms;
            cursor: pointer;
        }

        .button:hover {
            background: #333;
        }
    }

    .top {
        display: flex;
        flex-direction: column;
    }
`;
