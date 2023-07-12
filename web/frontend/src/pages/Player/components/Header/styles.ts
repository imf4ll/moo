import styled from 'styled-components';

export const Container = styled.div`
    background-color: #151515;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .notifications {
        margin-top: 0.25rem;
    }

    .buttons {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;

        img {
            cursor: pointer;
            transition: all ease 300ms;

            :hover {
                opacity: 0.7;
            }
        }
    }
    
    .searchBar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #252525;
        border-radius: 5px;
        padding: 0.4rem 0.45rem;
        margin-left: 3.5rem;
        width: 30%;

        input {
            outline: none;
            border: none;
            background-color: transparent;
            width: 100%;
            color: white;
            font-family: 'Inter', sans-serif;
            font-size: 11pt;
        }

        img {
            cursor: pointer;
        }
    }
`;
