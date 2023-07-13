import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

import { ItemProps } from '../../types';

import Play from '../../assets/play.svg';
import Remove from '../../assets/remove.svg';
import Add from '../../assets/add.svg';

import ImageBackground from '../../assets/background.jpg';

import { Queue } from '../../components/Queue';
import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { Item } from './components/Item';
import { MusicQueue } from './components/MusicQueue';
import { PlaylistModal } from './components/PlaylistModal';
import { Empty } from '../../components/Empty';
import { Playlist } from './components/Playlist';
import { MoreOptionsModal } from './components/MoreOptionsModal';

export const Player = () => {
    const [ queueOpened, setQueueOpened ] = useState<boolean>(false);
    const [ videos, setVideos ] = useState<Array<ItemProps>>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ playlists, setPlaylists ] = useState<Array<any>>([]);
    const [ playlistsToAdd, setPlaylistsToAdd ] = useState<Array<any>>([]);
    const [ playlistModalOpened, setPlaylistModalOpened ] = useState<boolean>(false);
    const [ musicQueueOpened, setMusicQueueOpened ] = useState<boolean>(false);
    const [ moreOptionsOpened, setMoreOptionsOpened ] = useState<boolean>(false);
    const [ currentAudio, setCurrentAudio ] = useState<string>("");
    const [ currentStats, setCurrentStats ] = useState<ItemProps>({
        thumb: ImageBackground,
        title: 'Not playing',
        author: '',
        id: '',
    });

    useEffect(() => {
        if (JSON.parse(window.localStorage.getItem('songqueue')!).length === 0) {
            if (window.localStorage.getItem('lastsong') !== null) {
                const lastSong = JSON.parse(window.localStorage.getItem('lastsong')!);

                setCurrentAudio(lastSong.audio);
                setCurrentStats(lastSong);
            }    
        }

        if (window.localStorage.getItem('playlists') !== null) {
            if (JSON.parse(window.localStorage.getItem('playlists')!).length > 0) {
                setPlaylists(JSON.parse(window.localStorage.getItem('playlists')!));

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

    }, []);

    const handlePlaylist = (k: number) => {
        const playlist = JSON.parse(window.localStorage.getItem('playlists')!)[k];

        if (window.localStorage.getItem('playersettings') !== null) {
            const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

            if (playerSettings.random) {
                playlist.videos = playlist.videos
                    .map(i => ({ i, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ i }) => i);
            }
        }
    
        window.localStorage.setItem('songqueue', JSON.stringify(playlist.videos));

        window.dispatchEvent(new Event('newqueue'));
    }

    const handleRemovePlaylist = (k: number) => {
        if (window.confirm('Are you sure?')) {
            const playlists = JSON.parse(window.localStorage.getItem('playlists')!);

            window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((_, key: number) => key !== k)));
        
            window.dispatchEvent(new Event('playlistsaved'));
        }
    }
    
    return (
        <>
            {
                queueOpened && <Queue queueOpened={ setQueueOpened } />
            }

            { 
                moreOptionsOpened && <MoreOptionsModal />
            }

            {
                musicQueueOpened && <MusicQueue musicQueueOpened={ setMusicQueueOpened } />
            }

            {
                playlistModalOpened && <PlaylistModal setPlaylistModalOpened={ setPlaylistModalOpened } />
            }

            <Container>
                <Header
                    setVideos={ setVideos }
                    setLoading={ setLoading }
                    setPlaylistsToAdd={ setPlaylistsToAdd }
                    moreOptionsOpened={ moreOptionsOpened }
                    setMoreOptionsOpened={ setMoreOptionsOpened }
                />

                <div className="playlistsToAdd">
                    { playlistsToAdd.length > 0 && !loading &&
                        playlistsToAdd.map((i, k) => (
                            <Playlist
                                title={ i.title }
                                id={ i.id }
                                songs={ i.songs }
                                thumb={ i.thumb }
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
                                user={ i.author }
                                views={ i.views }
                                id={ i.id }
                                duration={ i.length }
                                setCurrentAudio={ setCurrentAudio }
                                setCurrentStats={ setCurrentStats }
                            />
                        ))
                        : loading 
                            ? <ReactLoading type="spin" color="#999" width={ 36 } className="spinner" />
                            : <div className="playlists">
                                {
                                    playlists.length > 0
                                        ? playlists.map((i, k) => (
                                            <div key={ k } className="playlist" onClick={ () => handlePlaylist(k) }>
                                                <div className="background" style={{ backgroundImage: `url('${ i.thumb }')` }}></div>
                                                
                                                <p title={ i.title }>{ i.title.length > 16 ? i.title.substring(0, 15) + '...' : i.title }</p>

                                                <p className="songs">{ playlists[k].videos.length } songs</p>

                                                <div className="buttons">
                                                    <img src={ Play } width={ 36 } />

                                                    <img src={ Remove } width={ 32 } id="remove" onClick={ () => handleRemovePlaylist(k) } />
                                                </div>
                                            </div>
                                        ))
                                        : <Empty type='musicplayer' />
                                }
                                {
                                    videos.length === 0 && !loading &&
                                        <div className="playlist" onClick={ () => setPlaylistModalOpened(true) }>
                                            <div className="background" style={{ backgroundImage: `url('${ ImageBackground }')` }}></div>
                                            
                                            <p>Create new</p>

                                            <div className="buttons">
                                                <img src={ Add } width={ 36 } />
                                            </div>
                                        </div>
                                }
                            </div>
                    }
                </div>
                
                <AudioPlayer
                    currentAudio={ currentAudio }
                    currentStats={ currentStats }
                    setCurrentStats={ setCurrentStats }
                    setMusicQueueOpened={ setMusicQueueOpened }
                    musicQueueOpened={ musicQueueOpened }
                />
            </Container>
        </>
    );
}
