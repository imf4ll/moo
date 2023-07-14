import styled from 'styled-components';

export const Container = styled.div`
    padding-bottom: 5rem;
    display: flex;
    flex-direction: column;

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

    .playlistsToAdd {
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
        position: fixed;
        display: flex;
        top: 47.5%;
        left: 0.3rem;
        height: 75vh;
        transform: translateY(-50%);
        flex-direction: column;
        gap: 0.5rem;
        width: 4rem;
        overflow: auto;
        align-items: center;
        padding: 0.5rem 0;
        border-radius: 6px;
        background: #101010;
    
        ::-webkit-scrollbar {
            display: none;
        }
    }

    .playlistsToAdd {
        margin-top: 1rem;
    }

    .playlist {
        width: 54px;
        height: 54px;
        min-width: 54px;
        min-height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: 500;
        font-size: 14pt;
        flex-direction: column;
        position: relative;

        .background {
            transition: all ease 250ms;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 120px;
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 5px;
        }

        .songs {
            font-size: 11pt;
            margin-top: 0;
        }

        .buttons {
            display: flex;
            gap: 0;

            img {
                cursor: pointer;
                
                :hover {
                    opacity: 0.7
                }
            }
        }

        img {
            opacity: 0;
            transition: all ease 150ms;
            z-index: 1;
        }

        :hover {
            img {
                opacity: 1;
            }

            .background {
                filter: blur(1.5px);
            }
        }
    }

    .queue {
        width: 94vw;
        display: flex;
        flex-direction: column;
        position: relative;
        gap: 0.75rem;
        align-self: flex-end;
    }
`;
