import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

import { ItemProps } from '../../types';

import Play from '../../assets/play.svg';
import Remove from '../../assets/remove.svg';

import { Navbar } from '../../components/Navbar';
import { Queue } from '../../components/Queue';
import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { Item } from './components/Item';
import { MusicQueue } from './components/MusicQueue';
import { PlaylistModal } from './components/PlaylistModal';
import { Empty } from '../../components/Empty';

export const Player = () => {
    const [ queueOpened, setQueueOpened ] = useState<boolean>(false);
    const [ videos, setVideos ] = useState<Array<ItemProps>>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ playlists, setPlaylists ] = useState<Array<any>>([]);
    const [ playlistModalOpened, setPlaylistModalOpened ] = useState<boolean>(false);
    const [ musicQueueOpened, setMusicQueueOpened ] = useState<boolean>(false);
    const [ currentAudio, setCurrentAudio ] = useState<string>("");
    const [ currentStats, setCurrentStats ] = useState<ItemProps>({
        thumb: 'https://4.bp.blogspot.com/--OiScnnTPiU/Va-HwLLdONI/AAAAAAAAILs/_97hmfQLl8M/s1600/fundo-cinza-fundos%2B%25289%2529.jpg',
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

            }
        });

    }, []);

    const handlePlaylist = (k: number) => {
        const playlist = JSON.parse(window.localStorage.getItem('playlists')!)[k];
    
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
            <Navbar setQueueOpened={ setQueueOpened } />

            {
                queueOpened && <Queue queueOpened={ setQueueOpened } />
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
                    playlistModalOpened={ playlistModalOpened }
                    setPlaylistModalOpened={ setPlaylistModalOpened }
                />

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
                            ? <ReactLoading type="spin" color="#999" width={ 24 } className="spinner" />
                            : <div className="playlists">
                                {
                                    playlists.length > 0
                                        ? playlists.map((i, k) => (
                                            <div key={ k } className="playlist" onClick={ () => handlePlaylist(k) }>
                                                <div className="background" style={{ backgroundImage: `url('${ i.thumb }')` }}></div>
                                                
                                                <p>{ i.title }</p>

                                                <p className="songs">{ playlists[k].videos.length } songs</p>

                                                <div className="buttons">
                                                    <img src={ Play } width={ 54 } />

                                                    <img src={ Remove } width={ 50 } id="remove" onClick={ () => handleRemovePlaylist(k) } />
                                                </div>
                                            </div>
                                        ))
                                        : <Empty type='musicplayer' />
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
