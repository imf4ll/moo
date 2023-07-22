import { useEffect, useState, useRef } from 'react';

import { notificate } from '../../../../utils/notifications';
import { api } from '../../../../utils/api';
import { decode } from '../../../../utils/decode';

import { Container } from './styles';

import Back from '../../../../assets/back.svg';
import Play from '../../../../assets/play.svg';
import Save from '../../../../assets/heart.svg';
import Saved from '../../../../assets/heartfilled.svg';
import Download from '../../../../assets/download.svg';
import Sync from '../../../../assets/sync.svg';

import { Item } from '../../components/Item';

import { Video, Playlist } from '../../../../types';

export const PlaylistModal = ({ playlist, setCurrentPlaylist, setPlaylistModalOpened, setCurrentAudio, setCurrentStats }: {
    playlist: Playlist,
    setCurrentPlaylist: Function,
    setPlaylistModalOpened: Function,
    setCurrentAudio: Function,
    setCurrentStats: Function,
}) => {
    const [ alreadySaved, setAlreadySaved ] = useState<boolean>(false);
    const [ isCustom, setIsCustom ] = useState<boolean>(false);
    const saveRef = useRef<HTMLImageElement>(null);
    const syncRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (playlist && playlist.videos === undefined) {
            setPlaylistModalOpened(false);

            notificate('error', 'Failed to get playlist, try again, if the problem persists, may be caused by timeout, invalid playlist or was deleted.');
        }

        const playlists = window.localStorage.getItem('playlists');
        
        if (playlists !== null) {
            const p = JSON.parse(playlists).filter((i: Playlist) => i.id === playlist.id);
            
            if (p.length > 0) {
                setAlreadySaved(true);

                if (playlist.type === 'custom') setIsCustom(true);
            }
        }

    }, []);

    const handleDownload = () => {
        const settings = window.localStorage.getItem('settings');

        window.dispatchEvent(new Event('downloading'));

        if (settings !== null) {
            api.get(`/download?url=https://www.youtube.com/playlist?list=${ playlist.id }&path=${ JSON.parse(settings).path }`)
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

    const handlePlaylist = () => {
        let pl = Object.assign({}, playlist);

        if (window.localStorage.getItem('playersettings') !== null) {
            const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

            if (playerSettings.random) {
                pl.videos = pl.videos
                    .map(i => ({ i, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ i }) => i);
            }
        }

        window.localStorage.setItem('songqueue', JSON.stringify(pl.videos));

        window.dispatchEvent(new Event('newqueue'));
    }

    const handleSavePlaylist = () => {
        if (window.localStorage.getItem('playlists') !== null) {
            const playlists = JSON.parse(window.localStorage.getItem('playlists')!);

            playlists.unshift({
                ...playlist,
            });

            window.localStorage.setItem('playlists', JSON.stringify(playlists));

        } else {
            window.localStorage.setItem('playlists', JSON.stringify([{
                ...playlist,
            }]));
        }

        saveRef.current!.src = Saved;

        setAlreadySaved(true);
        
        window.dispatchEvent(new Event('playlistsaved'));
    }

    const handleRemovePlaylist = () => {
        const playlists = JSON.parse(window.localStorage.getItem('playlists')!);
        
        window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((i: Video) => i.id !== playlist.id)));

        window.dispatchEvent(new Event('playlistsaved'));
    
        saveRef.current!.src = Save;
    
        setAlreadySaved(false);
    }

    const handleSync = () => {
        syncRef.current!.className = 'syncing';

        api.get(`/sync?id=${ playlist.id }`)
            .then(({ data }) => setCurrentPlaylist((p: Playlist) => ({ ...p, videos: data.videos })))
            .catch(() => notificate('error', 'Failed to force syncing, maybe playlist is private, invalid or was deleted.'))
            .finally(() => syncRef.current!.className = '');
    }

    return (
        <Container>
            <div className="background" style={{ backgroundImage: `url("${ playlist.thumb }")` }}></div>
            
            <img id="back" src={ Back } width={ 20 } onClick={ () => setPlaylistModalOpened(false) } />
            
            <div className="content">
                <div className="title-playlist">
                    <div className="title-thumbnail" style={{ backgroundImage: `url("${ playlist.thumb }")` }} />

                    <div className="stats">
                        <h1>{ decode(playlist.title) }</h1>
                    
                        <p>{ playlist.videos && playlist.videos.length } songs</p>

                        <div className="buttons">
                            <img src={ Play } width={ 32 } onClick={ () => handlePlaylist() } />
                            
                            <img
                                src={ alreadySaved ? Saved : Save }
                                id="save"
                                ref={ saveRef }
                                width={ 28 }
                                style={{ padding: '0.7rem 0.65rem 0.65rem 0.65rem' }}
                                onClick={ alreadySaved ? () => handleRemovePlaylist() : () => handleSavePlaylist() }
                            />

                            <img
                                src={ Download }
                                width={ 28 }
                                style={{ padding: '0.65rem' }}
                                onClick={ () => handleDownload() }
                            />

                            {
                                isCustom &&
                                    <img
                                        src={ Sync }
                                        width={ 28 }
                                        onClick={ () => handleSync() }
                                        title="Forces sync"
                                        style={{ padding: '0.65rem' }}
                                        ref={ syncRef }
                                    />
                            }
                        </div>
                    </div>
                </div>

                <div className="items">
                    {
                        playlist.videos && playlist.videos.map((i, k) => (
                            <Item
                                key={ k }
                                title={ i.title }
                                thumb={ i.thumb }
                                id={ i.id }
                                author={ i.author }
                                duration={ i.duration }
                                views={ i.views }
                                setCurrentAudio={ setCurrentAudio }
                                setCurrentStats={ setCurrentStats }
                                position={ k }
                                playlist={ playlist }
                            />
                        ))
                    }
                </div>
            </div>
        </Container>
    );
}
