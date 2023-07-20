import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    background: #050505;
    border-radius: 10px;
    position: relative;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    z-index: 2;

    .background-playlist {
        width: 100%;
        height: 5rem;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        filter: blur(40px);
        transform: scale(3);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .content {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 1rem;

        .title-album {
            display: flex;
            align-items: center;
            gap: 1rem;
            align-self: flex-start;
            margin-left: 1.5rem;
            margin-top: 1.5rem;
            color: white;

            h1 {
                font-size: 18pt;
            }

            p {
                font-weight: 500;
                color: #CCC;
                font-size: 11pt;
            }
        }

        .background-album {
            background: #333;
            width: 180px;
            height: 180px;
            background-position: center;
            background-size: 320px;
            background-repeat: no-repeat;
            border-radius: 10px;
            transition: all ease 250ms;
        }
    }
`;
