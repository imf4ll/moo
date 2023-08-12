import { useEffect, useState, useRef } from 'react';

import { Container } from './styles';

import { notificate } from '../../utils/notifications';
import { copy } from '../../utils/copy';
import { api } from '../../utils/api';
import { decode } from '../../utils/decode';

import { duration as durationFormat } from '../../utils/time';

import Play from '../../assets/play.svg';
import AddToQueue from '../../assets/addtoqueue.svg';
import Save from '../../assets/heart.svg';
import Saved from '../../assets/heartfilled.svg';
import Download from '../../assets/download.svg';

import { Video, Playlist } from '../../types';

export const Item = ({ thumb, title, author, views, duration, id, setCurrentAudio, setCurrentStats, position, playlist }: {
    thumb: string,
    title: string,
    author: string,
    views: string,
    duration: string,
    id: string
    setCurrentAudio: Function,
    setCurrentStats: Function,
    position: number,
    playlist: Playlist,
}) => {
    const [ alreadySaved, setAlreadySaved ] = useState<boolean>(false);
    const addToQueueRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const onFavorite = () => {
            const favs = window.localStorage.getItem('favorites');

            if (favs !== null && favs) {
                if (JSON.parse(favs).filter((i: Video) => i.id === id).length > 0) {
                    setAlreadySaved(true);

                } else {
                    setAlreadySaved(false);

                }
            }
        }

        onFavorite();

        const onFavoritesUpdate = window.addEventListener('favoritesUpdated', onFavorite);

        // @ts-ignore
        window.removeEventListener('favoritesUpdated', onFavoritesUpdate);

    }, []);

    const handleSetAudio = () => {
        api.get(`/audio?id=${ id }`)
            .then(({ data }) => {
                if (!playlist.videos) {
                    setCurrentStats({ thumb, title, author, id, duration });

                    setCurrentAudio(data.audio);

                    const song = {
                        thumb,
                        title,
                        author,
                        id,
                        views,
                        duration,
                        audio: data.audio,
                    }

                    window.localStorage.setItem('lastsong', JSON.stringify(song));

                    window.localStorage.setItem('songqueue', JSON.stringify([ song ]));

                    window.dispatchEvent(new Event('newqueue'));
                    
                } else {
                    if (window.localStorage.getItem('playersettings') !== null) {
                        const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

                        if (playerSettings.random) {
                            const currentSong = playlist.videos[position];

                            let randomizedPlaylist = [];

                            randomizedPlaylist = playlist.videos
                                .map(i => ({ i, sort: Math.random() }))
                                .sort((a, b) => a.sort - b.sort)
                                .map(({ i }) => i)
                                .filter(i => i.id !== currentSong.id);

                            randomizedPlaylist.unshift(currentSong);

                            window.localStorage.setItem('songqueue', JSON.stringify(randomizedPlaylist));

                            window.dispatchEvent(new Event('newqueue'));

                            return;
                        }
                    }
 
                    window.localStorage.setItem('songqueue', JSON.stringify([
                        ...playlist.videos.slice(position, playlist.videos.length),
                        ...playlist.videos.slice(0, position),
                    ]));

                    window.dispatchEvent(new Event('newqueue'));
                }
            })

            .catch(() => notificate('error', 'Error trying to get audio.'));
    }

    const handleAddToQueue = () => {
        if (window.localStorage.getItem('songqueue') !== null) {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

            songQueue.push({
                thumb,
                title,
                author,
                id,
                views,
                duration,
            });

            window.localStorage.setItem('songqueue', JSON.stringify(songQueue));

            if (songQueue.length === 1) {
                window.dispatchEvent(new Event('newqueue'));

            }

        } else {
            window.localStorage.setItem('songqueue', JSON.stringify([{
                thumb,
                title,
                author,
                id,
                views,
                duration,
            }]));

            window.dispatchEvent(new Event('newqueue'));
        }

        window.dispatchEvent(new Event('queueUpdated'));

        addToQueueRef.current!.style.scale = '1.3';

        setTimeout(() => addToQueueRef.current!.style.scale = '1', 300);
    }

    const handleAddFavorite = () => {
        const favs = window.localStorage.getItem('favorites');

        const newFav = {
            thumb,
            title,
            author,
            id,
            views,
            duration,
        }

        if (favs !== null && favs.length > 0) {
            const favorites = JSON.parse(favs);

            favorites.push(newFav);

            window.localStorage.setItem('favorites', JSON.stringify(favorites));

        } else {
            window.localStorage.setItem('favorites', JSON.stringify([ newFav ]));

        }

        setAlreadySaved(true);

        window.dispatchEvent(new Event('favoritesUpdated'));
    }

    const handleRemoveFavorite = () => {
        const favs = window.localStorage.getItem('favorites');

        if (favs !== null && favs?.length > 0) {
            const favorites = JSON.parse(favs!);

            window.localStorage.setItem('favorites', JSON.stringify(favorites.filter((i: Video) => i.id !== id)));
        
            setAlreadySaved(false);
            
            window.dispatchEvent(new Event('favoritesUpdated'));
        }
    }

    const handleDownload = () => {
        const settings = window.localStorage.getItem('settings');

        window.dispatchEvent(new Event('downloading'));

        if (settings !== null) {
            api.get(`/download?url=https://www.youtube.com/watch?v=${ id }&path=${ JSON.parse(settings).path }`)
                .then(({ data }) => {
                    if (data.success) {
                        notificate('success', 'Download successfully');
                        
                    } else {
                        notificate('error', 'Failed to download music, check settings for a valid path or if \'yt-dlp\' was not installed.');

                    }
                        
                    window.dispatchEvent(new Event('idle'));
                })

                .catch(() => {
                    notificate('error', 'Failed to download music, check settings for a valid path or if \'yt-dlp\' was not installed.');

                    window.dispatchEvent(new Event('idle'));
                });
        }
    }
    
    return (
        <Container onClick={ e => e.detail === 2 && handleSetAudio() } onContextMenu={ e => copy(e, id) }>
            <div className="title">
                <img src={ Play } width={ 28 } onClick={ () => handleSetAudio() } id="control" />

                <img
                    src={ alreadySaved ? Saved : Save }
                    width={ 24 }
                    onClick={ alreadySaved ? () => handleRemoveFavorite() : () => handleAddFavorite() }
                    id="control"
                />

                <img
                    src={ AddToQueue }
                    width={ 24 }
                    id="control"
                    style={{ marginRight: '0.3rem' }}
                    onClick={ () => handleAddToQueue() }
                    ref={ addToQueueRef }
                /> 

                <div className="thumbnail" style={{ backgroundImage: `url('${ thumb }')` }} />

                <p title={ title }>{ title.length >= 80 ? decode(title).substring(0, 79) + '...' : decode(title) } · <span>{ decode(author) }</span></p>
            </div>
            
            <div className="right-side">
                <div className="stats">
                    <p>{ views }</p>

                    <p>{ duration.includes(':') ? duration : durationFormat(Number(duration)) }</p>
                </div>

                <img
                    src={ Download }
                    width={ 24 }
                    id="control"
                    onClick={ () => handleDownload() }
                />
            </div>
        </Container>
    );
}
