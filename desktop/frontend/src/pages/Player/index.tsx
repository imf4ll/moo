import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

import { ItemProps } from '../../types';

import { api } from '../../utils/api';
import { notificate } from '../../utils/notifications';

import AddToQueue from '../../assets/addtoqueue.svg';
import QueueEmpty from '../../assets/musicplayerempty.svg';

import FavoritesBackground from '../../assets/favorites.png';
import LocalBackground from '../../assets/local.png';

import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { Item } from './components/Item';
import { NewPlaylistModal } from './components/NewPlaylistModal';
import { Playlist } from './components/Playlist';
import { MoreOptionsModal } from './components/MoreOptionsModal';
import { QueueItem } from './components/QueueItem';
import { PlaylistModal } from './components/PlaylistModal';
import { FavoritesModal } from './components/FavoritesModal';
import { ArtistModal } from './components/ArtistModal';
import { LocalModal } from './components/LocalModal';
import { Settings } from './components/Settings';

import { Playlist as PlaylistT, Artist } from '../../types';

export const Player = () => {
    const [ videos, setVideos ] = useState<Array<ItemProps>>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ playlists, setPlaylists ] = useState<Array<any>>([]);
    const [ queue, setQueue ] = useState<Array<any>>([]);
    const [ playlistsToAdd, setPlaylistsToAdd ] = useState<Array<PlaylistT>>([]);
    const [ newPlaylistModalOpened, setNewPlaylistModalOpened ] = useState<boolean>(false);
    const [ playlistModalOpened, setPlaylistModalOpened ] = useState<boolean>(false);
    const [ moreOptionsOpened, setMoreOptionsOpened ] = useState<boolean>(false);
    const [ favoritesModalOpened, setFavoritesModalOpened ] = useState<boolean>(false);
    const [ artistModalOpened, setArtistModalOpened ] = useState<boolean>(false);
    const [ localModalOpened, setLocalModalOpened ] = useState<boolean>(false);
    const [ settingsModalOpened, setSettingsModalOpened ] = useState<boolean>(false);
    // @ts-ignore
    const [ artist, setArtist ] = useState<Artist>({});
    const [ currentAudio, setCurrentAudio ] = useState<string>("");
    // @ts-ignore
    const [ currentPlaylist, setCurrentPlaylist ] = useState<PlaylistT>({});
    // @ts-ignore
    const [ currentStats, setCurrentStats ] = useState<ItemProps>();

    useEffect(() => {
        if (window.localStorage.getItem('settings') === null) {
            setSettingsModalOpened(true);

            notificate('warning', 'First, you need to setup all settings, mainly download path to avoid any problems with downloads and local songs problems.', 10000);
        }

        if (window.localStorage.getItem('songqueue') === null || JSON.parse(window.localStorage.getItem('songqueue')!).length === 0) {
            if (window.localStorage.getItem('lastsong') !== null) {
                const lastSong = JSON.parse(window.localStorage.getItem('lastsong')!);

                setCurrentAudio(lastSong.audio);

                setCurrentStats({
                    title: lastSong.title,
                    author: lastSong.author,
                    duration: lastSong.duration,
                    thumb: lastSong.thumb,
                    id: '',
                    views: '',
                });
            }

        } else {
            setQueue(JSON.parse(window.localStorage.getItem('songqueue')!));

        }

        if (window.localStorage.getItem('playlists') !== null) {
            if (JSON.parse(window.localStorage.getItem('playlists')!).length > 0) {
                const updatePlaylist = () => setPlaylists(JSON.parse(window.localStorage.getItem('playlists')!));

                const onPlaylistsUpdate = window.addEventListener('playlistsUpdated', () => updatePlaylist());

                // @ts-ignore
                window.removeEventListener('playlistsUpdated', onPlaylistsUpdate);

                updatePlaylist();
            }
        }

        const onPlaylistSave = window.addEventListener('playlistsaved', () => {
            setPlaylists(JSON.parse(window.localStorage.getItem('playlists')!));

        });

        // @ts-ignore
        window.removeEventListener('playlistsaved', onPlaylistSave);

        const handleNewMusic = () => setQueue(JSON.parse(window.localStorage.getItem('songqueue')!));

        const onNewQueue = window.addEventListener('newqueue', () => handleNewMusic());
        const onMusicEnded = window.addEventListener('musicended', () => handleNewMusic());
        const onQueueUpdate = window.addEventListener('queueUpdated', () => handleNewMusic());

        // @ts-ignore
        window.removeEventListener('newqueue', onNewQueue);
        // @ts-ignore
        window.removeEventListener('musicended', onMusicEnded);
        // @ts-ignore
        window.removeEventListener('queueUpdated', onQueueUpdate);

    }, []);

    const handlePlaylist = (k: number) => {
        let playlists = JSON.parse(window.localStorage.getItem('playlists')!);

        playlists.unshift(playlists[k]);

        delete playlists[k + 1];

        api.get(`/playlist?id=${ playlists[0].id }`)
            .then(({ data }) => {
                setCurrentPlaylist({
                    ...playlists[0],
                    videos: data.videos,
                });

                setPlaylistModalOpened(true);
            })
            
            .catch(() => notificate('error', 'Failed to set playlist, maybe it\'s private, invalid or was deleted.'))

            .finally(() => {
                window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((i: PlaylistT) => i !== null)));

                window.dispatchEvent(new Event('playlistsUpdated'));        
            });
    }

    const handleArtist = (k: number) => {
        let playlists = JSON.parse(window.localStorage.getItem('playlists')!);

        playlists.unshift(playlists[k]);

        delete playlists[k + 1];

        api.get(`artist?id=${ playlists[0].id }`)
            .then(({ data }) => {
                setArtist({ ...data, photo: playlists[0].photo });

                setArtistModalOpened(true);
            })
            
            .catch(() => notificate("error", "Failed to retrieve data from artist, try again."))
            
            .finally(() => {
                window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((i: PlaylistT) => i !== null)));

                window.dispatchEvent(new Event('playlistsUpdated'));
            });
    }

    const handleSearchArtist = (id: string) => {
        api.get(`artist?id=${ id }`)
            .then(({ data }) => {
                setArtist(a => ({ ...data, photo: a.photo }));

                setArtistModalOpened(true);
            })
            
            .catch(() => notificate("error", "Failed to retrieve data from artist, try again."))
            
            .finally(() => {
                window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((i: PlaylistT) => i !== null)));

                window.dispatchEvent(new Event('playlistsUpdated'));
            });
    }
    
    return (
        <>
            { 
                moreOptionsOpened &&
                    <MoreOptionsModal
                        setSettingsModalOpened={ setSettingsModalOpened }
                        setMoreOptionsOpened={ setMoreOptionsOpened }
                    />
            }

            {
               newPlaylistModalOpened && <NewPlaylistModal setNewPlaylistModalOpened={ setNewPlaylistModalOpened } />
            }

            {
                playlistModalOpened &&
                    <PlaylistModal
                        playlist={ currentPlaylist }
                        setCurrentPlaylist={ setCurrentPlaylist }
                        setPlaylistModalOpened={ setPlaylistModalOpened }
                        setCurrentAudio={ setCurrentAudio }
                        setCurrentStats={ setCurrentStats }
                    />
            }

            {
                favoritesModalOpened &&
                    <FavoritesModal
                        setFavoritesModalOpened={ setFavoritesModalOpened }
                        setCurrentAudio={ setCurrentAudio }
                        setCurrentStats={ setCurrentStats }
                    />
            }

            {
                artistModalOpened &&
                    <ArtistModal
                        artist={ artist }
                        setArtistModalOpened={ setArtistModalOpened }
                    />
            }

            {
                localModalOpened &&
                    <LocalModal
                        setLocalModalOpened={ setLocalModalOpened }
                        setCurrentStats={ setCurrentStats }
                        setCurrentAudio={ setCurrentAudio }
                    />
            }

            {
                settingsModalOpened &&
                    <Settings
                        setSettingsModalOpened={ setSettingsModalOpened }
                    />
            }

            <Container style={{ paddingTop: videos && videos.length > 0 ? '3rem' : '2rem' }}>
                <Header
                    setVideos={ setVideos }
                    setLoading={ setLoading }
                    setPlaylistsToAdd={ setPlaylistsToAdd }
                    moreOptionsOpened={ moreOptionsOpened }
                    setMoreOptionsOpened={ setMoreOptionsOpened }
                    setArtist={ setArtist }
                />

                <div className="playlistsToAdd">
                    { artist && artist.photo !== '' && playlistsToAdd && playlistsToAdd.length > 0 && !loading && (
                        <div className="artist" onClick={ () => handleSearchArtist(artist.id) }>
                            <div className="background" style={{ backgroundImage: `url('${ artist.photo }')` }}></div>
                        </div>
                      )
                    }

                    { playlistsToAdd && playlistsToAdd.length > 0 && !loading &&
                        playlistsToAdd.map((i, k) => (
                            // @ts-ignore
                            <Playlist
                                title={ i.title }
                                id={ i.id }
                                songs={ i.songs }
                                thumb={ i.thumb }
                                setPlaylistModalOpened={ setPlaylistModalOpened }
                                key={ k }
                                setCurrentPlaylist={ setCurrentPlaylist }
                            />
                        ))
                    }
                </div>

                <div className="items">
                    { videos.length > 0 && !loading ?
                        videos.map((i, k) => (
                            <Item
                                key={ k }
                                thumb={ i.thumb }
                                title={ i.title }
                                author={ i.author }
                                views={ i.views }
                                id={ i.id }
                                duration={ i.duration }
                                setCurrentAudio={ setCurrentAudio }
                                setCurrentStats={ setCurrentStats }
                                position={ 0 }
                                // @ts-ignore
                                playlist={{}}
                            />
                        ))
                        : loading 
                            ? <ReactLoading type="spin" color="#999" width={ 36 } className="spinner" />
                            :  <div className="playlists">
                                <div title="Favorites" className="playlist" onClick={ () => setFavoritesModalOpened(true) }>
                                    <div className="backgrounds" style={{ backgroundImage: `url('${ FavoritesBackground }')` }} />
                                </div>
    
                                <div title="Local" className="playlist" onClick={ () => setLocalModalOpened(true) }>
                                    <div className="backgrounds" style={{ backgroundImage: `url('${ LocalBackground }')` }} />
                                </div>

                                {
                                    playlists.length > 0
                                        && playlists.map((i, k) => (
                                            i.photo
                                            ? (
                                                <div title={ i.name } key={ k } className="artist" onClick={ () => handleArtist(k) }>
                                                    <div className="background" style={{ backgroundImage: `url('${ i.photo }')` }}></div>
                                                </div>
                                            )
                                            : (
                                                <div title={ i.title } key={ k } className="playlist" onClick={ () => handlePlaylist(k) }>
                                                    <div className="background" style={{ backgroundImage: `url('${ i.thumb }')` }}></div>
                                                </div>
                                            ))
                                        )
                                }
                                {
                                    videos.length === 0 && !loading &&
                                        <div className="playlist" onClick={ () => setNewPlaylistModalOpened(true) }>
                                            <div className="background"></div>
                                            
                                            <div className="buttons">
                                                <img src={ AddToQueue } width={ 28 } />
                                            </div>
                                        </div>
                                }
                        </div> 
                    }
                </div>

                <div className="queue">
                    {
                        !loading && videos && videos.length === 0 && (
                            queue && queue.length > 0
                                ? queue.map((i, k) => (
                                    <QueueItem
                                        key={ k }
                                        position={ k }
                                        title={ i.title }
                                        thumb={ i.thumb }
                                        author={ i.author }
                                        duration={ i.duration }
                                        id={ i.id }
                                    />
                                ))
                                : currentStats && currentStats.title !== ''
                                    ? <QueueItem 
                                            position={ 0 }
                                            title={ currentStats.title }
                                            author={ currentStats.author }
                                            thumb={ currentStats.thumb }
                                            duration={ currentStats.duration }
                                            id={ currentStats.id }
                                        />
                                    : <div className="empty">
                                        <img src={ QueueEmpty } />

                                        <h3>Queue empty, try to search for a song or play a list. :)</h3>
                                    </div>
                        )
                    }
                </div>
                
                <AudioPlayer
                    currentAudio={ currentAudio }
                    currentStats={ currentStats! }
                    setCurrentStats={ setCurrentStats }
                />
            </Container>
        </>
    );
}
