import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background: #000;
    width: 100%;
    min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 7.5rem;
        background-size: 100%;
        background-repeat: no-repeat;
        filter: blur(40px);
        transform: scale(3);
        background-position: center;
        z-index: 0;
    }

    #back {
        z-index: 9999;
        position: absolute;
        top: 0.5rem;
        left: 0.75rem;
        cursor: pointer;
        padding: 0.5rem 0.25rem 0.5rem 0.75rem;
        background: rgba(30, 30, 30, 50%);
        border-radius: 100%;
        transition: all ease 200ms;

        :hover {
            opacity: 0.7;
        }
    }

    .content {
        z-index: 1001;
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding-bottom: 6rem;
        align-items: center;
    }

    .title-playlist {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-left: 4rem;
        margin-top: 3rem;
        margin-bottom: 1rem;
        align-self: flex-start;

        .title-thumbnail {
            width: 256px;
            height: 256px;
            background-position: center;
            background-size: 200%;
            background-repeat: no-repeat;
            border-radius: 10px;
        }
    }

    .items {
        width: 97.5%;
    }

    .stats {
        color: #FFF;

        p {
            font-weight: 500;
            color: #DDD;
        }
    }

    .buttons {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            background: rgba(30, 30, 30, 50%);
            padding: 0.5rem;
            border-radius: 100%;
            cursor: pointer;
            transition: all ease 300ms;

            :hover {
                opacity: 0.7;
            }
        }
    }
`;
