import styled from 'styled-components';

export const Container = styled.div`
    padding-bottom: 4.5rem;
    padding-top: 3rem;
    overflow: hidden;

    .items {
        width: 100%;
        padding: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        overflow: auto;
    }

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        right: 50%;
        transform: translate(-50%, -50%);
    }

    .playlists, .playlistsToAdd {
        display: flex;
        gap: 2rem;
        justify-content: center;
        align-items: center;
        margin-top: -0.75rem;
        flex-wrap: wrap;
        width: 100%;
        z-index: 0;
    }

    .playlists {
        margin-left: -0.75rem;
    }

    .playlistsToAdd {
        margin-top: 1rem;
    }

    .playlist {
        width: 260px;
        height: 150px;
        display: flex;
        border: 2px solid #111;
        border-radius: 10px;
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
    }
`;
