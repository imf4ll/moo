import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 998;
    background-color: rgba(0, 0, 0, 95%);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    .stats {
        display: flex;
        gap: 0.6rem;
        color: white;
        font-size: 11pt;
        align-items: center;
        margin-left: 1rem;
        min-width: 35%;
        max-width: 35%;
        
        img {
            border-radius: 6px;
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
            100% { transform: translateX(-100%) }
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
        margin-left: -20%;
    }

    .time {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        color: #FFF;
        font-size: 10pt;
        font-weight: 500;
        margin: 0 1.5rem;
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
        width: 12.5%;
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
        outline: none;
        -webkit-appearance: none;
        appearance: none;
        background: transparent;

        ::-webkit-slider-runnable-track {
            background: #333;
            border-radius: 100px;
            overflow: hidden;
        }

        ::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            background: #AC6AFF;
            height: 4px;
            width: 0.5rem;
            border-radius: 1px;
        }
    }

    #rangeAudio {
        position: absolute;
        top: -0.1rem;
        right: -0.1rem;
        width: 100%;

        ::-webkit-slider-runnable-track {
            border-radius: 0;    
            background: #222;
        }
    }
`;
