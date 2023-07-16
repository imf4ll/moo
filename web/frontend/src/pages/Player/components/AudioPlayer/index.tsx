import { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from './styles';

import { useTitle } from '../../../../hooks/useTitle';

import { notificate } from '../../../../utils/notifications';
import { duration as durationFormat } from '../../../../utils/time';

import { ItemProps } from '../../../../types';

import Play from '../../../../assets/playaudio.svg';
import Pause from '../../../../assets/pause.svg';
import Previous from '../../../../assets/previous.svg';
import Next from '../../../../assets/next.svg';
import Volume from '../../../../assets/volume.svg';
import VolumeOff from '../../../../assets/volumeoff.svg';
import NoRepeat from '../../../../assets/repeat.svg';
import Repeat from '../../../../assets/repeatactive.svg';
import RepeatOne from '../../../../assets/repeatone.svg';
import Random from '../../../../assets/random.svg';
import RandomActive from '../../../../assets/randomactive.svg';
import Save from '../../../../assets/heart.svg';
import Saved from '../../../../assets/heartfilled.svg';

import { Video } from '../../../../types';

export const AudioPlayer = ({ currentAudio, currentStats, setCurrentStats }: {
        currentAudio: string,
        currentStats: ItemProps,
        setCurrentStats: Function,
    }) => {

    const [ songQueue, setSongQueue ] = useState<Array<any>>([]);
    const [ repeatState, setRepeatState ] = useState<string>('no');
    const [ randomState, setRandomState ] = useState<boolean>(false);
    const [ duration, setDuration ] = useState<string>("");
    const [ length, setLength ] = useState<string>("");
    const [ alreadySaved, setAlreadySaved ] = useState<boolean>(false);

    const handleMusic = () => {
        const audio: HTMLAudioElement = document.querySelector('#audio')!;
        
        if (window.localStorage.getItem('songqueue') !== null) {
            const songQueue: Array<any> = JSON.parse(window.localStorage.getItem('songqueue')!);

            if (songQueue.length > 0) {
                axios.get(`http://localhost:3001/audio?id=${ songQueue[0].id }`)
                    .then(r => {
                        audio.src = r.data.audio;

                        audio.play();

                        setCurrentStats(songQueue[0]);
                    })

                    .catch(() => {
                        notificate('error', 'Failed to get audio, maybe caused by age restriction.');

                        songQueue.shift();

                        window.localStorage.setItem('songqueue', JSON.stringify(songQueue));

                        window.dispatchEvent(new Event('musicended'));

                        handleMusic();
                    });
                    
                    setSongQueue(songQueue);

            } else {
                axios.get(`http://localhost:3001/audio?id=${ currentStats.id }`)
                    .then(r => {
                        audio.src = r.data.audio;

                        audio.play();
                    })
            }
        
        } else {
            axios.get(`http://localhost:3001/audio?id=${ currentStats.id }`)
                .then(r => {
                    audio.src = r.data.audio;

                    audio.play();
                });
        }
    }

    useEffect(() => {
        if (window.localStorage.getItem('playersettings') !== null) {
            const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

            setRepeatState(playerSettings.repeat);
            setRandomState(playerSettings.random);
        }

        const audio: HTMLAudioElement = document.querySelector('#audio')!;

        if (window.localStorage.getItem('songqueue') !== null && JSON.parse(window.localStorage.getItem('songqueue')!).length > 0) {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

            axios.get(`http://localhost:3001/audio?id=${ songQueue[0].id }`)
                .then(r => {
                    audio.src = r.data.audio;

                    setCurrentStats(songQueue[0]);
                })

                .catch(() => {
                    notificate('warning', 'Trying to get audio...');

                    songQueue.shift();

                    window.localStorage.setItem('songqueue', JSON.stringify(songQueue));

                    window.dispatchEvent(new Event('musicended'));

                    handleMusic();
                });
        }
        
        const playPauseButton: HTMLImageElement = document.querySelector('#playpause')!;

        window.addEventListener('keydown', e => {
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

        audio.addEventListener('durationchange', () => {
            setLength(durationFormat(audio.duration));

            playPauseButton.src = Pause;

            audio.play();
        });

        audio.addEventListener('ended', () => {
            const repeat = JSON.parse(window.localStorage.getItem('playersettings')!).repeat;
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

            if (JSON.parse(window.localStorage.getItem('songqueue')!).length > 0) {
                if (repeat === 'no') {
                    songQueue.shift();

                    window.localStorage.setItem('songqueue', JSON.stringify(songQueue));
                    
                    window.dispatchEvent(new Event('musicended'));
                    
                    setSongQueue(songQueue);
                
                } else if (repeat === 'yes') {
                    songQueue.push(songQueue.shift());

                    window.localStorage.setItem('songqueue', JSON.stringify(songQueue));

                    window.dispatchEvent(new Event('musicended'));

                    setSongQueue(songQueue);

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

        const rangeAudio: HTMLInputElement = document.querySelector('#rangeAudio')!;

        rangeAudio.addEventListener('input', () => {
            audio.currentTime = audio.duration * (Number(rangeAudio.value) / 1000);

        });

        audio.addEventListener('timeupdate', () => {
            // @ts-ignore
            rangeAudio.value = audio.currentTime / audio.duration * 1000;

            setDuration(durationFormat(audio.currentTime));
        });

        const rangeVolume: HTMLInputElement = document.querySelector('#rangeVolume')!;

        rangeVolume.addEventListener('input', (e: any) => audio.volume = e.target!.value / 100);

        window.addEventListener('storage', () => {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

            setSongQueue(songQueue);
        });

        window.addEventListener('musicended', handleMusic);
        window.addEventListener('newqueue', handleMusic);

    }, []);

    useEffect(() => {
        const audio: HTMLAudioElement = document.querySelector('#audio')!;

        audio.addEventListener('playing', () => useTitle(currentStats.title + ' - '));

        audio.addEventListener('pause', () => useTitle(''));

        const onFavorite = () => {
            if (window.localStorage.getItem('favorites') !== null) {
                const favorites = JSON.parse(window.localStorage.getItem('favorites')!);

                if (favorites.filter((i: Video) => i.id === currentStats.id).length > 0) {
                    setAlreadySaved(true);

                } else {
                    setAlreadySaved(false);

                }
            }
        }

        onFavorite();

        window.addEventListener('favoritesUpdated', onFavorite);

    }, [ currentStats ]);

    useEffect(() => {
        const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

        window.localStorage.setItem('playersettings', JSON.stringify({
            ...playerSettings,
            repeat: repeatState,
            random: randomState,
        }));

    }, [ repeatState, randomState ]);

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
        const repeat = JSON.parse(window.localStorage.getItem('playersettings')!).repeat;
        const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

        if (type === 'previous' || songQueue === null || songQueue.length <= 0) {
            audio.currentTime = 0;
        
        } else {
            if (songQueue !== null && songQueue.length > 0) {
                if (repeat === 'no' || repeat === 'one') {
                    songQueue.shift();

                    window.localStorage.setItem('songqueue', JSON.stringify(songQueue));
                    
                    window.dispatchEvent(new Event('musicended'));
                    
                    setSongQueue(songQueue);
                
                } else if (repeat === 'yes') {
                    songQueue.push(songQueue.shift());

                    window.localStorage.setItem('songqueue', JSON.stringify(songQueue));
                    
                    window.dispatchEvent(new Event('musicended'));
                    
                    setSongQueue(songQueue);   
                }
            }    
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
    
    const handleRandom = () => {
        const randomImg: HTMLImageElement = document.querySelector('#random')!;

        if (randomState) {
            setRandomState(false);

            randomImg.src = Random;
        
        } else {
            setRandomState(true);

            randomImg.src = RandomActive;
        }
    }

    const handleAddFavorite = () => {
        const favs = window.localStorage.getItem('favorites');

        const newFav = {
            thumb: currentStats.thumb,
            title: currentStats.title,
            author: currentStats.author,
            id: currentStats.id,
            views: currentStats.views,
            duration: currentStats.duration,
        }

        if (favs !== null && favs.length > 0) {
            const favorites = JSON.parse(favs);

            favorites.push(newFav);

            window.localStorage.setItem('favorites', JSON.stringify(favorites));

        } else {
            window.localStorage.setItem('favorites', JSON.stringify([ newFav ]));

        }
            
        window.dispatchEvent(new Event('favoritesUpdated'));

        setAlreadySaved(true);
    }

    const handleRemoveFavorite = () => {
        const favs = window.localStorage.getItem('favorites');

        if (favs !== null && favs?.length > 0) {
            const favorites = JSON.parse(favs!);

            window.localStorage.setItem('favorites', JSON.stringify(favorites.filter((i: Video) => i.id !== currentStats.id)));
        
            window.dispatchEvent(new Event('favoritesUpdated'));
        }
    }

    return (
        <>
            <audio
                src={ currentAudio }
                id="audio"
                onError={ () => handleMusic() }
                style={{ pointerEvents: 'none' }}
            />

            <Container>
                <div className="stats">
                    <div
                        className="thumbnail"
                        style={{ backgroundImage: `url('${ currentStats.thumb }')` }}
                    />

                    <div className="title">
                        <p
                            title={ currentStats.title }
                            className={ currentStats.title.length > 40 ? 'animated' : '' }
                        >
                            { currentStats.title.replace("\\u0026", "&") }
                        </p>
                        
                        <p>{ currentStats.author.replace("\\u0026", "&") }</p>
                    </div>
                </div>

                <div className="audioplayer">
                    <div className="controls">
                        <img
                            src={ randomState ? RandomActive : Random }
                            width={ 24 }
                            id="random"
                            onClick={ () => handleRandom() }
                        />

                        <div className="main-controls">
                            <img
                                src={ Previous }
                                width={ 28 }
                                onClick={ () => handleSkip('previous') }
                            />

                            <img
                                src={ Play }
                                width={ 42 }
                                onClick={ () => handlePlayPause() }
                                id="playpause"
                            />

                            <img
                                src={ Next }
                                width={ 28 }
                                onClick={ () => handleSkip('next') }
                                title={ songQueue.length > 1 ? songQueue[1].title : '' }
                            />
                        </div>

                        <img
                            src={ repeatState === 'no' ? NoRepeat : repeatState === 'yes' ? Repeat : RepeatOne }
                            width={ 24 }
                            id="repeat"
                            onClick={ () => handleRepeat() }
                        />
                    </div>

                    <input
                        type="range"
                        id="rangeAudio"
                        defaultValue={ 0 }
                        min={ 0 }
                        max={ 1000 }
                        title={ `${ duration } / ${ length }` }
                    />
                </div>

                <div className="otherbuttons">
                    <img
                        src={ alreadySaved ? Saved : Save }
                        width={ 24 }
                        onClick={ alreadySaved ? () => handleRemoveFavorite() : () => handleAddFavorite() }
                    />
                </div>
                
                <div className="volume">
                    <img src={ Volume } width={ 21 } id="volume" onClick={ () => handleMute() } />

                    <input type="range" id="rangeVolume" defaultValue={ 100 } step={ 10 } />
                </div>
            </Container>
        </>
    );
}
