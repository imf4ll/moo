import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 90%);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    .stats {
        display: flex;
        gap: 0.6rem;
        color: white;
        font-size: 11pt;
        align-items: center;
        margin-left: 0.5rem;
        min-width: 35%;
        max-width: 35%;
        margin-top: 0.2rem;
        
        .thumbnail {
            border-radius: 10px;
            width: 72px;
            height: 64px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 110px;
        }
    }

    .title {
        display: flex;
        flex-direction: column;
        gap: -5rem;
        font-size: 10.5pt;
        width: 100%;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;

        .animated {
            animation: infinite 15s marquee linear;
        }

        @keyframes marquee {
            0% { transform: translateX(0%) }
            100% { transform: translateX(-75%) }
        }

        p:last-child {
            color: #AAA;
            font-size: 9pt;
            margin-top: -0.5rem;
        }
    }

    .audioplayer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translateX(-50%);
    }

    .main-controls {
        display: flex;
        gap: 0.25rem;
        margin: 0 0.75rem;
    }

    .otherbuttons {
        display: flex;
        gap: 1rem;
        margin-right: 0.75rem;
    }

    .otherbuttons, .volume, .audioplayer {
        img {
            transition: all ease 500ms;
            cursor: pointer;

            :hover {
                opacity: 0.6;
            }    
        }
    }

    .volume {
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
        margin-right: 1rem;

        img {
            transition: all ease 500ms;
            cursor: pointer;

            :hover {
                opacity: 0.6;
            }
        }
    }

    #rangeAudio, #rangeVolume {
        width: 100%;
        height: 3px;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
        cursor: pointer;
        overflow: hidden;
        background: #222;

        ::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            background: #333;
            height: 0;
            width: 0;
            box-shadow: -50vw 0 0 50vw #ac6aff;
        }

        ::-moz-range-track {
            background: #222;
            border-radius: 100px;
        }

        ::-moz-range-thumb {
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
            height: 0;
            width: 0;
            box-shadow: -50vw 0 0 50vw #ac6aff;
        }
    }

    #rangeVolume {
        border-radius: 100px;
    }

    #rangeAudio {
        position: absolute;
        top: -0.1rem;
        right: -0.1rem;
        width: 100%;
    }
`;
