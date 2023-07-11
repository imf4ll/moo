import { useEffect, useState } from 'react';

import { Container } from './styles';

import { time } from '../../../../utils/time';
import { ItemProps } from '../../../../types';

import Play from '../../../../assets/play.svg';
import Pause from '../../../../assets/pause.svg';
import Previous from '../../../../assets/previous.svg';
import Next from '../../../../assets/next.svg';
import Volume from '../../../../assets/volume.svg';
import VolumeOff from '../../../../assets/volumeoff.svg';

export const AudioPlayer = ({ currentAudio, currentStats }: { currentAudio: string, currentStats: ItemProps }) => {
    const [ currentTime, setCurrentTime ] = useState<number>(0);
    const [ duration, setDuration ] = useState<number>(0);

    useEffect(() => {
        const audio: HTMLAudioElement = document.querySelector('#audio')!;
        const playPauseButton: HTMLImageElement = document.querySelector('#playpause')!;

        const onAudio = audio.addEventListener('durationchange', () => {
            setDuration(audio.duration);

            playPauseButton.src = Pause;

            setTimeout(() => audio.play(), 1000);
        });

        audio.removeEventListener('load', onAudio);

        const onAudioEnd = audio.addEventListener('ended', () => {
            playPauseButton.src = Play;

        });

        audio.removeEventListener('ended', onAudioEnd);

        const rangeAudio: HTMLInputElement = document.querySelector('#rangeAudio')!;

        const onAudioSeek = rangeAudio.addEventListener('input', () => {
            audio.currentTime = audio.duration * (rangeAudio.value / 100);

        });

        rangeAudio.removeEventListener('input', onAudioSeek);

        const onAudioProgress = audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);

            rangeAudio.value = audio.currentTime / audio.duration * 100;

        });

        audio.removeEventListener('timeupdate', onAudioProgress);

        const rangeVolume: HTMLInputElement = document.querySelector('#rangeVolume')!;

        const onVolumeChange = rangeVolume.addEventListener('input', e => audio.volume = e.target.value / 100);

        rangeVolume.removeEventListener('input', onVolumeChange);

    }, []);

    const handlePlayPause = () => {
        const audio: HTMLAudioElement = document.querySelector('#audio')!;
        const playPauseButton: HTMLImageElement = document.querySelector('#playpause')!;

        if (audio.paused) {
            playPauseButton.src = Pause;

            audio.play();
        
        } else {
            playPauseButton.src = Play;

            audio.pause();
        }
    }

    const handleSkip = (type: string) => {
        const audio: HTMLAudioElement = document.querySelector('#audio')!;

    }

    const handleMute = () => {
        const audio: HTMLAudioElement = document.querySelector('#audio')!;
        const volume: HTMLImageElement = document.querySelector('#volume')!;

        if (audio.muted) {
            volume.src = Volume;

            audio.muted = false;

            return;
        }

        if (audio.volume != 0) {
            volume.src = VolumeOff;

            audio.muted = true;
        }
    }

    return (
        <>
            <audio
                src={ currentAudio }
                id="audio"
            />

            <Container>
                <div className="stats">
                    <img
                        src={ currentStats.thumb }
                        width={ 100 }
                        height={ 56 }
                    />

                    <div className="title">
                        <p className={ currentStats.title.length > 30 ? 'animated' : '' }>{ currentStats.title }</p>
                        
                        <p>{ currentStats.author }</p>
                    </div>
                </div>

                <div className="audioplayer">
                    <img
                        src={ Previous }
                        width={ 24 }
                        onClick={ () => handleSkip('previous') }
                    />

                    <img
                        src={ Play }
                        width={ 32 }
                        onClick={ () => handlePlayPause() }
                        id="playpause"
                    />

                    <img
                        src={ Next }
                        width={ 24 }
                        onClick={ () => handleSkip('next') }
                    />

                    <div className="time">
                        <p>{ time(currentTime) }</p>
                        
                        <input type="range" id="rangeAudio" defaultValue={ 0 } />
                    
                        <p>{ time(duration) }</p>
                    </div>


                </div>

                <div className="volume">
                    <img src={ Volume } width={ 24 } id="volume" onClick={ () => handleMute() } />

                    <input type="range" id="rangeVolume" defaultValue={ 100 } />
                </div>
            </Container>
        </>
    );
}
