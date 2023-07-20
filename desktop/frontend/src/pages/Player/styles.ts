import styled from 'styled-components';

export const Container = styled.div`
    padding-bottom: 5.5rem;
    display: flex;
    flex-direction: column;

    .items {
        width: 98%;
        display: flex;
        flex-direction: column;
        overflow: auto;
        align-self: center;
        margin-top: 1.5rem;
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

        .artist {
            width: 144px;
            height: 144px;
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
                background-size: 100%;
                width: 100%;
                height: 100%;
                border-radius: 100%;
                position: absolute;
            }
        }
    }

    .playlists {
        position: fixed;
        display: flex;
        top: 48vh;
        left: 0.3rem;
        height: 75%;
        transform: translateY(-50%);
        flex-direction: column;
        gap: 0.5rem;
        width: 4rem;
        overflow: auto;
        align-items: center;
        padding: 0.5rem 0;
        z-index: 999;
        border-right: 1px solid #111;
    
        ::-webkit-scrollbar {
            display: none;
        }
    }

    .playlistsToAdd {
        margin-top: 1rem;
    }

    .playlist, .artist {
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
        cursor: pointer;

        .background {
            background: #333;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 120px;
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 5px;
        }

        .backgrounds {
            transition: all ease 150ms;
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;
            background-position: center;
            background-size: 100%;
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

            .background, .background {
                filter: blur(1px);
            }
        }
    }

    .artist {
        .background {
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 100%;
        }
    }

    .queue {
        width: 92.5%;
        display: flex;
        flex-direction: column;
        position: relative;
        align-self: flex-end;
        margin-right: 1rem;
        margin-top: -0.5rem;

        #first {
            background: #111;
            margin-bottom: 0.75rem;
            cursor: auto;

            .title p:first-child {
                font-weight: 600;
            }

            .thumbnail {
                width: 96px;
                height: 96px;
                background-size: 192px;
            }
        }
    }

    @media (max-width: 1200px) {
        .queue {
            width: 90%;
        }
    }
`;
