import { useEffect, useState, useRef } from 'react';

import { Container } from './styles';

import Save from '../../../../assets/heart.svg';
import Saved from '../../../../assets/heartfilled.svg';
import Play from '../../../../assets/play.svg';

import { Item } from '../Item';

import { Playlist } from '../../../../types';

import { decode } from '../../../../utils/decode';

export const ArtistPlaylist = ({ playlist }: {
    playlist: Playlist,
}) => {
    const [ playlistAlreadySaved, setPlaylistAlreadySaved ] = useState<boolean>(false);
    const saveRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const playlists = window.localStorage.getItem('playlists');

        if (playlists !== null) {
            if (JSON.parse(playlists).filter((i: Playlist) => i.id === playlist.id).length > 0) {
                setPlaylistAlreadySaved(true);

            }
        }

    }, []);

    const handlePlay = () => {
        let p = [ ...playlist.videos ];

        if (window.localStorage.getItem('playersettings') !== null) {
            const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

            if (playerSettings.random) {
                p = p
                    .map(i => ({ i, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ i }) => i);
            }
        }
        
        window.localStorage.setItem('songqueue', JSON.stringify(p));
        
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

        setPlaylistAlreadySaved(true);
        
        window.dispatchEvent(new Event('playlistsaved'));
    }

    const handleRemovePlaylist = () => {
        const playlists = JSON.parse(window.localStorage.getItem('playlists')!);
        
        window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((i: Playlist) => i.id !== playlist.id)));

        window.dispatchEvent(new Event('playlistsaved'));
    
        saveRef.current!.src = Save;
    
        setPlaylistAlreadySaved(false);
    }

    return (
        <Container>
            <div className="background-playlist" style={{ backgroundImage: `url('${ playlist.thumb }')` }}></div>

            <div className="content">
                <div className="title-album">
                    <div className="background-album" style={{ backgroundImage: `url('${ playlist.thumb }')` }}></div>

                    <div>
                        <h1>{ decode(playlist.title) }</h1>

                        <p>{ playlist.songs } songs · { playlist.songs === 1 ? 'Single' : playlist.songs <= 4 ? 'EP' : 'Album' }</p>

                        <div className="buttons">
                            <img src={ Play } width={ 32 } onClick={ () => handlePlay() } />
                            
                            <img
                                src={ playlistAlreadySaved ? Saved : Save }
                                id="save"
                                ref={ saveRef }
                                width={ 28 }
                                style={{ padding: '0.65rem' }}
                                onClick={ playlistAlreadySaved ? () => handleRemovePlaylist() : () => handleSavePlaylist() }
                            />
                        </div>
                    </div>
                </div>

                <div className="items">
                    {
                        playlist.videos.map((i, k) => (
                            <Item
                                title={ i.title }
                                playlist={ playlist }
                                thumb={ i.thumb }
                                id={ i.id }
                                author={ i.author }
                                duration={ i.duration }
                                views={ i.views }
                                setCurrentAudio={ () => {} }
                                setCurrentStats={ () => {} }
                                position={ k }
                                key={ k }
                            />
                        ))
                    }
                </div>
            </div>
        </Container>
    );
}
