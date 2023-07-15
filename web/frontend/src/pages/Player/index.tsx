import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

import { ItemProps } from '../../types';

import Add from '../../assets/add.svg';

import ImageBackground from '../../assets/background.jpg';

import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { Item } from './components/Item';
import { NewPlaylistModal } from './components/NewPlaylistModal';
import { Empty } from '../../components/Empty';
import { Playlist } from './components/Playlist';
import { MoreOptionsModal } from './components/MoreOptionsModal';
import { QueueItem } from './components/QueueItem';
import { PlaylistModal } from './components/PlaylistModal';

export const Player = () => {
    const [ videos, setVideos ] = useState<Array<ItemProps>>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ playlists, setPlaylists ] = useState<Array<any>>([]);
    const [ queue, setQueue ] = useState<Array<any>>([]);
    const [ playlistsToAdd, setPlaylistsToAdd ] = useState<Array<any>>([]);
    const [ newPlaylistModalOpened, setNewPlaylistModalOpened ] = useState<boolean>(false);
    const [ playlistModalOpened, setPlaylistModalOpened ] = useState<boolean>(false);
    const [ moreOptionsOpened, setMoreOptionsOpened ] = useState<boolean>(false);
    const [ currentAudio, setCurrentAudio ] = useState<string>("");
    const [ currentPlaylist, setCurrentPlaylist ] = useState<{}>({});
    const [ currentStats, setCurrentStats ] = useState<ItemProps>({
        thumb: ImageBackground,
        id: '',
        title: '',
        author: '',
        duration: '',
    });

    useEffect(() => {
        if (window.localStorage.getItem('songqueue') === null || JSON.parse(window.localStorage.getItem('songqueue')!).length === 0) {
            if (window.localStorage.getItem('lastsong') !== null) {
                const lastSong = JSON.parse(window.localStorage.getItem('lastsong')!);

                setCurrentAudio(lastSong.audio);
                setCurrentStats(lastSong);
            }

        } else {
            setQueue(JSON.parse(window.localStorage.getItem('songqueue')!));

        }

        if (window.localStorage.getItem('playlists') !== null) {
            if (JSON.parse(window.localStorage.getItem('playlists')!).length > 0) {
                const updatePlaylist = () => setPlaylists(JSON.parse(window.localStorage.getItem('playlists')!));

                window.addEventListener('playlistsUpdated', () => updatePlaylist());

                updatePlaylist();
            }
        }

        window.addEventListener('playlistsaved', () => {
            setPlaylists(JSON.parse(window.localStorage.getItem('playlists')!));

        });

        document.querySelector('#bar')!.addEventListener('input', e => {
            if (e.target!.value === '') {
                setVideos([]);

                setPlaylistsToAdd([]);
            }
        });

        const handleNewMusic = () => setQueue(JSON.parse(window.localStorage.getItem('songqueue')!));

        window.addEventListener('newqueue', () => handleNewMusic());

        window.addEventListener('musicended', () => handleNewMusic());

    }, []);

    const handlePlaylist = (k: number) => {
        let playlists = JSON.parse(window.localStorage.getItem('playlists')!);

        playlists.unshift(playlists[k]);

        delete playlists[k + 1];

        window.localStorage.setItem('playlists', JSON.stringify(playlists.filter(i => i !== null)));

        window.dispatchEvent(new Event('playlistsUpdated'));

        setPlaylistModalOpened(true);

        setCurrentPlaylist(playlists[0]);
    }
    
    return (
        <>
            { 
                moreOptionsOpened && <MoreOptionsModal />
            }

            {
               newPlaylistModalOpened && <NewPlaylistModal setNewPlaylistModalOpened={ setNewPlaylistModalOpened } />
            }

            {
                playlistModalOpened &&
                    <PlaylistModal
                        currentPlaylist={ currentPlaylist }
                        setPlaylistModalOpened={ setPlaylistModalOpened }
                        setCurrentAudio={ setCurrentAudio }
                        setCurrentStats={ setCurrentStats }
                    />
            }

            <Container style={{ paddingTop: videos && videos.length > 0 ? '3rem' : '2rem' }}>
                <Header
                    setVideos={ setVideos }
                    setLoading={ setLoading }
                    setPlaylistsToAdd={ setPlaylistsToAdd }
                    moreOptionsOpened={ moreOptionsOpened }
                    setMoreOptionsOpened={ setMoreOptionsOpened }
                />

                <div className="playlistsToAdd">
                    { playlistsToAdd && playlistsToAdd.length > 0 && !loading &&
                        playlistsToAdd.map((i, k) => (
                            <Playlist
                                title={ i.title }
                                id={ i.id }
                                songs={ i.songs }
                                thumb={ i.thumb }
                                setPlaylistModalOpened={ setPlaylistModalOpened }
                                setCurrentPlaylist={ setCurrentPlaylist }
                                key={ k }
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
                                playlist={{}}
                            />
                        ))
                        : loading 
                            ? <ReactLoading type="spin" color="#999" width={ 36 } className="spinner" />
                            :  <div className="playlists">
                                {
                                    playlists.length > 0
                                        && playlists.map((i, k) => (
                                            <div title={ i.title } key={ k } className="playlist" onClick={ () => handlePlaylist(k) }>
                                                <div className="background" style={{ backgroundImage: `url('${ i.thumb }')` }}></div>
                                            </div>
                                        ))
                                }
                                {
                                    videos.length === 0 && !loading &&
                                        <div className="playlist" onClick={ () => setNewPlaylistModalOpened(true) }>
                                            <div className="background" style={{ backgroundImage: `url('${ ImageBackground }')` }}></div>
                                            
                                            <div className="buttons">
                                                <img src={ Add } width={ 28 } />
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
                                : currentStats && currentStats.duration !== ''
                                    ? <QueueItem 
                                            position={ 0 }
                                            title={ currentStats.title }
                                            author={ currentStats.author }
                                            thumb={ currentStats.thumb }
                                            duration={ currentStats.duration }
                                            id={ currentStats.id }
                                        />
                                    : <Empty type="musicplayer" />         
                        )
                    }
                </div>
                
                <AudioPlayer
                    currentAudio={ currentAudio }
                    currentStats={ currentStats }
                    setCurrentStats={ setCurrentStats }
                />
            </Container>
        </>
    );
}
