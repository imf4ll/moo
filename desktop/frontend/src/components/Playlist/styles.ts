import styled from 'styled-components';

export const Container = styled.div`
    width: 180px;
    height: 180px;
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
        background: #333;
        transition: all ease 500ms;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 360px;
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
        gap: 1rem;

        img {
            cursor: pointer;
            transition: all ease 300ms;
            
            :hover {
                opacity: 0.5;
            }
        }
    }

    p, img {
        z-index: 1;
    }

    .background {
        filter: blur(2px);
    }
`;
