import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    background: #151515;
    width: 100vw;
    height: 4.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .stats {
        display: flex;
        gap: 0.6rem;
        color: white;
        font-size: 11pt;
        align-items: center;
        margin-left: 3.5rem;
        min-width: 25%;
        max-width: 25%;
        
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
            animation: infinite 10s marquee linear;
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
        margin-left: -12.5%;

        img {
            cursor: pointer;
        }
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

    .volume {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
        margin-right: 1rem;
    }

    #rangeVolume {
        width: 100%;
        outline: none;
        border-radius: 10px;
        overflow: hidden;
        height: 6px;
        
        ::-webkit-slider-runnable-track {
            background: #333;
        }

        ::-moz-range-thumb {
            background: #333;
        }

        ::-webkit-slider-thumb {
            box-shadow: -407px 0 0 400px #AC6AFF;
        }

        ::-moz-range-thumb {
            box-shadow: -400px 0 0 400px #AC6AFF;
        }
    }

    #rangeAudio {
        width: 100%;
        outline: none;
        border-radius: 10px;
        overflow: hidden;
        height: 6px;
        
        ::-webkit-slider-runnable-track {
            background: #333;
        }

        ::-moz-range-thumb {
            background: #333;
        }

        ::-webkit-slider-thumb {
            box-shadow: -407px 0 0 400px #AC6AFF;
        }

        ::-moz-range-thumb {
            box-shadow: -400px 0 0 400px #AC6AFF;
        }
    }
`;
