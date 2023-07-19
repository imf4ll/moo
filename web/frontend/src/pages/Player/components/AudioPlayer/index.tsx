import { useEffect, useState, useRef } from 'react';

import { Container } from './styles';

import { useTitle } from '../../../../hooks/useTitle';

import { notificate } from '../../../../utils/notifications';
import { duration as durationFormat } from '../../../../utils/time';
import { api } from '../../../../utils/api';
import { decode } from '../../../../utils/decode';

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
    const audioRef = useRef<HTMLAudioElement>(null);
    const playPauseRef = useRef<HTMLImageElement>(null);
    const rangeAudioRef = useRef<HTMLInputElement>(null);
    const rangeVolumeRef = useRef<HTMLInputElement>(null);
    const volumeRef = useRef<HTMLImageElement>(null);
    const repeatRef = useRef<HTMLImageElement>(null);
    const randomRef = useRef<HTMLImageElement>(null);

    const handleMusic = () => {
        if (window.localStorage.getItem('songqueue') !== null) {
            const songQueue: Array<any> = JSON.parse(window.localStorage.getItem('songqueue')!);

            if (songQueue.length > 0) {
                if (songQueue[0].id !== '') {
                    api.get(`/audio?id=${ songQueue[0].id }`)
                        .then(r => {
                            audioRef.current!.src = r.data.audio;

                            audioRef.current!.play();

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
                    audioRef.current!.src = songQueue[0].audio;

                    audioRef.current!.play();

                    setCurrentStats(songQueue[0]);
                }
            }
        }

        api.get(`/audio?id=${ currentStats.id }`)
            .then(r => {
                audioRef.current!.src = r.data.audio;

                audioRef.current!.play();
            })

            .catch(() => notificate('error', 'Failed to get audio.'));
    }

    useEffect(() => {
        if (window.localStorage.getItem('playersettings') !== null) {
            const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

            setRepeatState(playerSettings.repeat);
            setRandomState(playerSettings.random);
        }

        if (window.localStorage.getItem('songqueue') !== null && JSON.parse(window.localStorage.getItem('songqueue')!).length > 0) {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);
            
            if (songQueue[0].id !== '') {
                api.get(`/audio?id=${ songQueue[0].id }`)
                    .then(r => {
                        audioRef.current!.src = r.data.audio;

                        setCurrentStats(songQueue[0]);
                    })

                    .catch(() => {
                        notificate('warning', 'Trying to get audio...');

                        songQueue.shift();

                        window.localStorage.setItem('songqueue', JSON.stringify(songQueue));

                        window.dispatchEvent(new Event('musicended'));

                        handleMusic();
                    });        
            
            } else {
                audioRef.current!.src = songQueue[0].audio;

                setCurrentStats(songQueue[0]);
            }
        }
       
        window.addEventListener('keydown', e => {
            if (document.activeElement?.tagName !== 'INPUT') {
                if (e.code === 'Space') {
                    e.preventDefault();

                    if (audioRef.current!.paused) {
                        audioRef.current!.play();

                        playPauseRef.current!.src = Pause;

                    } else {
                        audioRef.current!.pause();

                        playPauseRef.current!.src = Play;
                    }
                
                } else if (e.code === 'ArrowLeft') {
                    handleSkip(e, 'previous');

                } else if (e.code === 'ArrowRight') {
                    handleSkip(e, 'next');

                }
            }
        });

        audioRef.current!.addEventListener('durationchange', () => {
            setLength(durationFormat(audioRef.current!.duration));

            playPauseRef.current!.src = Pause;

            audioRef.current!.play();
        });

        audioRef.current!.addEventListener('ended', () => {
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
                    audioRef.current!.play();

                }

            } else {
                if (repeat === 'yes' || repeat === 'one') {
                    audioRef.current!.play();

                } else {
                    playPauseRef.current!.src = Play
                    
                }
            }
        });

        rangeAudioRef.current!.addEventListener('input', () => {
            audioRef.current!.currentTime = audioRef.current!.duration * (Number(rangeAudioRef.current!.value) / 1000);

        });

        audioRef.current!.addEventListener('timeupdate', () => {
            // @ts-ignore
            rangeAudio.value = audio.currentTime / audio.duration * 1000;

            setDuration(durationFormat(audioRef.current!.currentTime));
        });

        rangeVolumeRef.current!.addEventListener('input', (e: any) => audioRef.current!.volume = e.target!.value / 100);

        window.addEventListener('storage', () => {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

            setSongQueue(songQueue);
        });

        window.addEventListener('musicended', handleMusic);
        window.addEventListener('newqueue', handleMusic);

    }, []);

    useEffect(() => {
        audioRef.current!.addEventListener('playing', () => useTitle(currentStats.title + ' - '));

        audioRef.current!.addEventListener('pause', () => useTitle(''));

        const onFavorite = () => {
            if (currentStats) {
                if (window.localStorage.getItem('favorites') !== null) {
                    const favorites = JSON.parse(window.localStorage.getItem('favorites')!);

                    if (favorites.filter((i: Video) => i.id === currentStats.id).length > 0) {
                        setAlreadySaved(true);

                    } else {
                        setAlreadySaved(false);

                    }
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
        if (audioRef.current!.paused) {
            playPauseRef.current!.src = Pause;

            audioRef.current!.play();
        
        } else {
            playPauseRef.current!.src = Play;

            audioRef.current!.pause();
        }
    }

    const handleSkip = ({ detail }: any, type: string) => {
        const repeat = JSON.parse(window.localStorage.getItem('playersettings')!).repeat;
        const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

        if (type === 'previous' || songQueue === null || songQueue.length <= 0) {
            if (detail === 1 && audioRef.current!.currentTime > 3) {
                audioRef.current!.currentTime = 0;
            
            } else {
                songQueue.unshift(songQueue.pop());

                window.localStorage.setItem('songqueue', JSON.stringify(songQueue));

                window.dispatchEvent(new Event('newqueue'));

                setSongQueue(songQueue);
            }

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
        if (audioRef.current!.muted) {
            volumeRef.current!.src = Volume;

            audioRef.current!.muted = false;

            return;
        }

        if (audioRef.current!.volume != 0) {
            volumeRef.current!.src = VolumeOff;

            audioRef.current!.muted = true;
        }
    }

    const handleRepeat = () => {
        if (repeatState === 'no') {
            setRepeatState('yes');

            repeatRef.current!.src = Repeat;

        } else if (repeatState === 'yes') {
            setRepeatState('one');
            
            repeatRef.current!.src = RepeatOne;

        } else {
            setRepeatState('no');

            repeatRef.current!.src = NoRepeat;
        }
    }
    
    const handleRandom = () => {
        if (randomState) {
            setRandomState(false);

            randomRef.current!.src = Random;
        
        } else {
            setRandomState(true);

            randomRef.current!.src = RandomActive;
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
       
            setAlreadySaved(false);

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
                ref={ audioRef }
            />

            <Container>
                <div className="stats">
                    <div
                        className="thumbnail"
                        style={ currentStats ? { backgroundImage: `url('${ currentStats.thumb }')` } : { background: '#333' }}
                    />

                    <div className="title">
                        <p
                            title={ currentStats ? currentStats.title : '' }
                            className={ currentStats ? currentStats.title.length > 50 ? 'animated' : '' : '' }
                        >
                            { currentStats ? decode(currentStats.title) : 'Not playing' }
                        </p>
                        
                        <p>{ currentStats ? decode(currentStats.author) : '' }</p>
                    </div>
                </div>

                <div className="audioplayer">
                    <div className="controls">
                        <img
                            src={ randomState ? RandomActive : Random }
                            width={ 24 }
                            id="random"
                            ref={ randomRef }
                            onClick={ () => handleRandom() }
                        />

                        <div className="main-controls">
                            <img
                                src={ Previous }
                                width={ 28 }
                                onClick={ e => handleSkip(e, 'previous') }
                            />

                            <img
                                src={ Play }
                                width={ 42 }
                                onClick={ () => handlePlayPause() }
                                id="playpause"
                                ref={ playPauseRef }
                            />

                            <img
                                src={ Next }
                                width={ 28 }
                                onClick={ e => handleSkip(e, 'next') }
                                title={ songQueue.length > 1 ? songQueue[1].title : '' }
                            />
                        </div>

                        <img
                            src={ repeatState === 'no' ? NoRepeat : repeatState === 'yes' ? Repeat : RepeatOne }
                            width={ 24 }
                            id="repeat"
                            ref={ repeatRef }
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
                        ref={ rangeAudioRef }
                    />
                </div>

                <div className="otherbuttons">
                    {
                        currentStats && currentStats.id !== '' &&
                            <img
                                src={ alreadySaved ? Saved : Save }
                                width={ 24 }
                                onClick={ alreadySaved ? () => handleRemoveFavorite() : () => handleAddFavorite() }
                            />
                    }
                </div>
                
                <div className="volume">
                    <img src={ Volume } ref={ volumeRef } width={ 21 } id="volume" onClick={ () => handleMute() } />

                    <input type="range" id="rangeVolume" ref={ rangeVolumeRef } defaultValue={ 100 } step={ 10 } />
                </div>
            </Container>
        </>
    );
}
