import styled from 'styled-components';

export const Container = styled.div`
    width: 260px;
    height: 150px;
    border: 2px solid #111;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 500;
    font-size: 14pt;
    cursor: pointer;
    flex-direction: column;
    position: relative;

    .background {
        transition: all ease 500ms;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        position: absolute;
    }

    .songs {
        font-size: 11pt;
        margin-top: 0;
    }

    .buttons {
        display: flex;

        #remove:hover {
            opacity: 0.7
        }
    }

    p, img {
        transition: all ease 150ms;
        z-index: 1;
    }

    .background {
        filter: blur(2px);
    }

    :hover {
        .background {
            filter: blur(4px);
        }
    }
`;
