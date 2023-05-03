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
        gap: 0.5rem;
    }
`;
