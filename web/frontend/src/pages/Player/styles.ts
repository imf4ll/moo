import styled from 'styled-components';

export const Container = styled.div`
    padding-bottom: 4rem;
    overflow: hidden;

    .items {
        width: 95%;
        margin-left: 3rem;
        margin-top: 2.5rem;
        padding: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        overflow: auto;
    }

    .spinner {
        position: absolute;
        left: 50%;
        right: 50%;
        top: 4rem;
    }

    .playlists {
        display: flex;
        gap: 2rem;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
    }

    .playlist {
        width: 240px;
        height: 240px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: 500;
        font-size: 14pt;
        cursor: pointer;
        flex-direction: column;

        .background {
            transition: all ease 500ms;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            width: 248px;
            height: 240px;
            position: absolute;
            border-radius: 10px;
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
            opacity: 0;
            transition: all ease 300ms;
            z-index: 1;
        }

        :hover {
            .background {
                filter: blur(3px);
            }
            
            p, img {
                opacity: 1;
            }
        }
    }
`;
