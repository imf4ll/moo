import { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from './styles';

import { time } from '../../../../utils/time';
import { ItemProps } from '../../../../types';

import Play from '../../../../assets/play.svg';
import Pause from '../../../../assets/pause.svg';
import Previous from '../../../../assets/previous.svg';
import Next from '../../../../assets/next.svg';
import Volume from '../../../../assets/volume.svg';
import VolumeOff from '../../../../assets/volumeoff.svg';
import Share from '../../../../assets/share.svg';
import Queue from '../../../../assets/queue.svg';
import NoRepeat from '../../../../assets/repeat.svg';
import Repeat from '../../../../assets/repeatactive.svg';
import RepeatOne from '../../../../assets/repeatone.svg';

export const AudioPlayer = ({ currentAudio, currentStats, setCurrentStats, setMusicQueueOpened, musicQueueOpened }: {
        currentAudio: string,
        currentStats: ItemProps,
        setCurrentStats: Function,
        setMusicQueueOpened: Function,
        musicQueueOpened: boolean,
    }) => {

    const [ currentTime, setCurrentTime ] = useState<number>(0);
    const [ duration, setDuration ] = useState<number>(0);
    const [ songQueue, setSongQueue ] = useState<Array<any>>([]);
    const [ repeatState, setRepeatState ] = useState<string>('no');
    const [ playerSettings, setPlayerSettings ] = useState<{
        repeat: string,
    }>({});

    useEffect(() => {
        if (window.localStorage.getItem('playersettings') !== null) {
            const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

            setPlayerSettings(playerSettings);

            setRepeatState(playerSettings.repeat);
        }

        const audio: HTMLAudioElement = document.querySelector('#audio')!;

        if (JSON.parse(window.localStorage.getItem('songqueue')!).length > 0) {
            const currentAudio = JSON.parse(window.localStorage.getItem('songqueue')!)[0];

            axios.get(`http://localhost:3001/audio?id=${ currentAudio.id }`)
                .then(r => {
                    audio.src = r.data.audio;

                    setCurrentStats(currentAudio);
                })

                .catch(() => {});
        }
        
        const playPauseButton: HTMLImageElement = document.querySelector('#playpause')!;

        const onSpace = window.addEventListener('keydown', e => {
            if (e.code === 'Space') {
                if (document.activeElement?.tagName !== 'INPUT') {
                    if (audio.paused) {
                        audio.play();

                        playPauseButton.src = Pause;

                    } else {
                        audio.pause();

                        playPauseButton.src = Play;
                    }    
                }
            }
        });

        window.removeEventListener('keydown', onSpace);

        const onAudio = audio.addEventListener('durationchange', () => {
            setDuration(audio.duration);

            playPauseButton.src = Pause;

            audio.play();
        });

        audio.removeEventListener('durationchange', onAudio);

        const onAudioEnd = audio.addEventListener('ended', () => {
            const repeat = JSON.parse(window.localStorage.getItem('playersettings')!).repeat;

            if (JSON.parse(window.localStorage.getItem('songqueue')!).length > 0) {
                if (repeat === 'yes') {
                    const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

                    songQueue.shift();

                    window.localStorage.setItem('songqueue', JSON.stringify(songQueue));
                    
                    window.dispatchEvent(new Event('musicended'));
                    
                    setSongQueue(songQueue);
                
                } else if (repeat === 'yes') {
                    // Soon

                } else {
                    audio.play();

                }

            } else {
                if (repeat === 'yes' || repeat === 'one') {
                    audio.play();

                } else {
                    playPauseButton.src = Play
                    
                }
            }
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

        const onVolumeChange = rangeVolume.addEventListener('input', e => audio.volume = e.target!.value / 100);

        rangeVolume.removeEventListener('input', onVolumeChange);

        const onStorage = window.addEventListener('storage', () => {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

            setSongQueue(songQueue);
        });

        window.removeEventListener('storage', onStorage);

        const handleMusic = () => {
            if (window.localStorage.getItem('songqueue') !== null) {
                const songQueue: Array<any> = JSON.parse(window.localStorage.getItem('songqueue')!);

                if (songQueue.length > 0) {
                    axios.get(`http://localhost:3001/audio?id=${ songQueue[0].id }`)
                        .then(r => {
                            audio.src = r.data.audio;

                            audio.play();

                            setCurrentStats(songQueue[0]);
                        })

                        .catch(() => {});
                
                }
            } 
        }

        window.addEventListener('musicended', handleMusic);
        window.addEventListener('newqueue', handleMusic);

    }, []);

    useEffect(() => {


    }, []);

    useEffect(() => {
        const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

        window.localStorage.setItem('playersettings', JSON.stringify({
            ...playerSettings,
            repeat: repeatState,
        }));

    }, [ repeatState ]);

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

        if (type === 'previous') {
            audio.currentTime = 0;

        } else {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

            songQueue.shift();

            window.localStorage.setItem('songqueue', JSON.stringify(songQueue));
            
            window.dispatchEvent(new Event('musicended'));
            
            setSongQueue(songQueue);
        }
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

    const handleRepeat = () => {
        const repeatImg: HTMLImageElement = document.querySelector('#repeat')!;

        if (repeatState === 'no') {
            setRepeatState('yes');

            repeatImg.src = Repeat;

        } else if (repeatState === 'yes') {
            setRepeatState('one');
            
            repeatImg.src = RepeatOne;

        } else {
            setRepeatState('no');

            repeatImg.src = NoRepeat;
        }
    }
    
    // random
    
    const handleShare = () => {
        navigator.permissions.query({ name: 'clipboard-write' }).then(r => {
            if (r.state === 'granted' || r.state === 'prompt') {
                const shareButton: HTMLImageElement = document.querySelector('#shareButton')!;
                
                navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${ currentStats.id }`);

                shareButton.style.scale = '1.5';
            
                setTimeout(() => shareButton.style.scale = '1', 300);
            }
        });
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

                    <img
                        src={ repeatState === 'no' ? NoRepeat : repeatState === 'yes' ? Repeat : RepeatOne }
                        width={ 20 }
                        id="repeat"
                        onClick={ () => handleRepeat() }
                    />

                    <div className="time">
                        <p>{ time(currentTime) }</p>
                        
                        <input type="range" id="rangeAudio" defaultValue={ 0 } />
                    
                        <p>{ time(duration) }</p>
                    </div>
                </div>

                <div className="otherbuttons">
                    <img src={ Share } width={ 20 } onClick={ () => handleShare() } id="shareButton" />

                    <img src={ Queue } width={ 24 } onClick={ () => setMusicQueueOpened(!musicQueueOpened) } />
                </div>

                <div className="volume">
                    <img src={ Volume } width={ 24 } id="volume" onClick={ () => handleMute() } />

                    <input type="range" id="rangeVolume" defaultValue={ 100 } step={ 10 } />
                </div>
            </Container>
        </>
    );
}
