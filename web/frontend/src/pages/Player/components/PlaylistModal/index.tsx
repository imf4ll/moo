import { useEffect, useState } from 'react';

import { Container } from './styles';

import Back from '../../../../assets/back.svg';
import Play from '../../../../assets/play.svg';
import Save from '../../../../assets/heart.svg';
import Saved from '../../../../assets/heartfilled.svg';

import { Item } from '../../components/Item';

import { Video, Playlist } from '../../../../types';

export const PlaylistModal = ({ currentPlaylist, setPlaylistModalOpened, setCurrentAudio, setCurrentStats }: {
    currentPlaylist: Playlist,
    setPlaylistModalOpened: Function,
    setCurrentAudio: Function,
    setCurrentStats: Function,
}) => {
    const [ alreadySaved, setAlreadySaved ] = useState<boolean>(false);

    useEffect(() => {
        const playlists = window.localStorage.getItem('playlists');

        if (playlists !== null) {
            if (JSON.parse(playlists).filter((i: Video) => i.id === currentPlaylist.id).length > 0) {
                setAlreadySaved(true);

            }
        }

    }, []);

    const handlePlaylist = () => {
        let playlist = Object.assign({}, currentPlaylist);

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

    const handleSavePlaylist = () => {
        if (window.localStorage.getItem('playlists') !== null) {
            const playlists = JSON.parse(window.localStorage.getItem('playlists')!);

            playlists.unshift({
                ...currentPlaylist,
            });

            window.localStorage.setItem('playlists', JSON.stringify(playlists));

        } else {
            window.localStorage.setItem('playlists', JSON.stringify([{
                ...currentPlaylist,
            }]));
        }

        document.querySelector<HTMLImageElement>('#save')!.src = Saved;

        setAlreadySaved(true);
        
        window.dispatchEvent(new Event('playlistsaved'));
    }

    const handleRemovePlaylist = () => {
        const playlists = JSON.parse(window.localStorage.getItem('playlists')!);
        
        window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((i: Video) => i.id !== currentPlaylist.id)));

        window.dispatchEvent(new Event('playlistsaved'));
    
        document.querySelector<HTMLImageElement>('#save')!.src = Save;
    
        setAlreadySaved(false);
    }

    return (
        <Container>
            <div className="background" style={{ backgroundImage: `url("${ currentPlaylist.thumb }")` }}></div>
            
            <img id="back" src={ Back } width={ 20 } onClick={ () => setPlaylistModalOpened(false) } />
            
            <div className="content">
                <div className="title-playlist">
                    <div className="title-thumbnail" style={{ backgroundImage: `url("${ currentPlaylist.thumb }")` }} />

                    <div className="stats">
                        <h1>{ currentPlaylist.title }</h1>
                    
                        <p>{ currentPlaylist.videos.length } songs</p>

                        <div className="buttons">
                            <img src={ Play } width={ 32 } onClick={ () => handlePlaylist() } />
                            
                            <img
                                src={ alreadySaved ? Saved : Save }
                                id="save"
                                width={ 28 }
                                style={{ padding: '0.65rem' }}
                                onClick={ alreadySaved ? () => handleRemovePlaylist() : () => handleSavePlaylist() }
                            />
                        </div>
                    </div>
                </div>

                <div className="items">
                    {
                        currentPlaylist.videos.map((i, k) => (
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
                                playlist={ currentPlaylist }
                            />
                        ))
                    }
                </div>
            </div>
        </Container>
    );
}
