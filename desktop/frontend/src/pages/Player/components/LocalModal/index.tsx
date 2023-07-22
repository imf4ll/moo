import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import Play from '../../../../assets/play.svg';
import Back from '../../../../assets/back.svg';

import { duration as durationFormat } from '../../../../utils/time';
import { decode } from '../../../../utils/decode';
import { notificate } from '../../../../utils/notifications';
import { api } from '../../../../utils/api';

import { Container } from './styles';

interface LocalSong {
    title: string;
    author: string;
    duration: string;
    thumb: string;
    path: string;
    id: string;
}

export const LocalModal = ({ setLocalModalOpened, setCurrentStats, setCurrentAudio }: {
    setLocalModalOpened: Function;
    setCurrentStats: Function;
    setCurrentAudio: Function;
}) => {
    const [ songs, setSongs ] = useState<Array<LocalSong>>([]);

    useEffect(() => {
        const settings = window.localStorage.getItem('settings');

        if (settings !== null) {
            api.get(`/downloads?path=${ JSON.parse(settings).path }`)
                .then(({ data }) => { 
                    if (data.files && data.files.length > 0) {
                        setSongs(data.files);
                        
                    } else {
                        setLocalModalOpened(false);

                        notificate('warning', "Current path doens't not have any songs, check settings.");
                    }
                })
                
                .catch(() => {
                    setLocalModalOpened(false);

                    notificate('error', 'Failed to get downloads path, check settings for a valid path.');
                });
        }

    }, []);

    const handleSetAudio = (position: number, song: LocalSong) => {
        if (songs.length === 1) {
            const thumb = `${ api.defaults.baseURL }/files?path=${ song.thumb }`;
            const audio = `${ api.defaults.baseURL }/files?path=${ song.path }`;

            setCurrentStats({
                thumb,
                title: song.title,
                author: song.author,
                duration: song.duration,
                id: '',
            });

            setCurrentAudio(audio);

            const songToAdd = {
                thumb,
                title: song.title,
                author: song.author,
                duration: song.duration,
                id: '',
                views: '',
                audio,
            }

            window.localStorage.setItem('lastsong', JSON.stringify(songToAdd));

            window.localStorage.setItem('songqueue', JSON.stringify([ songToAdd ]));

            window.dispatchEvent(new Event('newqueue'));
        
        } else {
            const songsArr: Array<any> = [];

            songs.forEach(song => songsArr.push({
                thumb: `${ api.defaults.baseURL }/files?path=${ song.thumb }`,
                title: song.title,
                author: song.author,
                duration: song.duration,
                id: '',
                views: '',
                audio: `${ api.defaults.baseURL }/files?path=${ song.path }`,
            }));

            if (window.localStorage.getItem('playersettings') !== null) {
                const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

                if (playerSettings.random) {
                    const currentSong = songsArr[position];

                    let randomizedPlaylist = [];

                    randomizedPlaylist = songsArr
                        .map(i => ({ i, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ i }) => i)
                        .filter(i => i.path !== currentSong.path);

                    randomizedPlaylist.unshift(currentSong);

                    window.localStorage.setItem('songqueue', JSON.stringify(randomizedPlaylist));

                    window.dispatchEvent(new Event('newqueue'));

                    return;
                }
            }

            window.localStorage.setItem('songqueue', JSON.stringify([
                ...songsArr.slice(position, songsArr.length),
                ...songsArr.slice(0, position),
            ]));

            window.dispatchEvent(new Event('newqueue'));
        }
    }

    const handlePlaylist = () => {
        let songsArr: Array<any> = [];

        songs.forEach(song => songsArr.push({
            thumb: `${ api.defaults.baseURL }/files?path=${ song.thumb }`,
            title: song.title,
            author: song.author,
            duration: song.duration,
            id: '',
            views: '',
            audio: `${ api.defaults.baseURL }/files?path=${ song.path }`,
        }));

        if (window.localStorage.getItem('playersettings') !== null) {
            const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

            if (playerSettings.random) {
                songsArr = songsArr
                    .map(i => ({ i, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ i }) => i);
            }
        }

        window.localStorage.setItem('songqueue', JSON.stringify(songsArr));

        window.dispatchEvent(new Event('newqueue'));
    }

    return (
        <Container>
            <div className="background"></div>
            
            <img id="back" src={ Back } width={ 20 } onClick={ () => setLocalModalOpened(false) } />

            <div className="content">
                <div className="title-playlist">
                    <div className="title-thumbnail"></div>

                    <div className="stats">
                        <h1>Local Songs</h1>

                        <p>{ songs ? songs.length : 0 } songs</p>

                        <div className="buttons">
                            <img src={ Play } width={ 32 } onClick={ () => handlePlaylist() }/>
                        </div>
                    </div>
                </div>

                <div className="items">
                    {
                        songs && songs.length > 0
                            ? songs.map((i, k) => (
                                <div className="item" onClick={ e => e.detail === 2 && '' } key={ k }>
                                    <div className="title">
                                        <img src={ Play } width={ 28 } onClick={ () => handleSetAudio(k, i) } id="control" />

                                        <div className="thumbnail" style={{ backgroundImage: `url('${ api.defaults.baseURL }/files?path=${ i.thumb }')` }} />

                                        <p title={ i.title }>{ i.title.length >= 80 ? decode(i.title).substring(0, 79) + '...' : decode(i.title) } · <span>{ decode(i.author) }</span></p>
                                    </div>
                                    
                                    <div className="right-side">
                                        <div className="stats">
                                            <p>{ i.duration.includes(':') ? i.duration : durationFormat(Number(i.duration)) }</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <ReactLoading type="spin" color="#555" width={ 54 } className="loading" />
                        }
                </div>
            </div>
        </Container>
    );
}
