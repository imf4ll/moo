import { useEffect, useState, useRef } from 'react';
import ReactLoading from 'react-loading';

import Back from '../../../../assets/back.svg';
import Save from '../../../../assets/heart.svg';
import Saved from '../../../../assets/heartfilled.svg';

import { notificate } from '../../../../utils/notifications';
import { api } from '../../../../utils/api';

import { Container } from './styles';

import { ArtistPlaylist } from '../ArtistPlaylist';

import { Video, PlaylistSearch, Playlist } from '../../../../types';

export const ArtistModal = ({ setArtistModalOpened, artist }: {
    setArtistModalOpened: Function,
    artist: {
        id: string,
        photo: string,
        name: string,
        playlists: Array<Playlist>,
    },
}) => {
    const [ playlists, setPlaylists ] = useState<Array<PlaylistSearch>>([]);
    const [ allPlaylists, setAllPlaylists ] = useState<Array<Playlist>>([]);
    const [ artistAlreadySaved, setArtistAlreadySaved ] = useState<boolean>(false);
    const [ playlistsCount, setPlaylistsCount ] = useState<number>(0);
    const saveRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (artist.playlists && artist.playlists.length > 0) {
            setPlaylistsCount(artist.playlists.length);

            setPlaylists(artist.playlists);

        } else {
            setArtistModalOpened(false);

            notificate("error", "Failed to retrieve data from artist, try again.");
        }

        const playlists = window.localStorage.getItem('playlists');

        if (playlists !== null) {
            if (JSON.parse(playlists).filter((i: Video) => i.id === artist.id).length > 0) {
                setArtistAlreadySaved(true);

            }
        }

    }, []);

    const load = (p: PlaylistSearch) => {
        if (allPlaylists.length < playlistsCount) {
            api.get(`/playlist?id=${ p.id }`)
                .then(({ data }) => {
                    if (data.videos.length > 0) {
                        setAllPlaylists(playlist => [...playlist, {
                            videos: data.videos,
                            title: p.title,
                            thumb: p.thumb,
                            songs: p.songs,
                            id: p.id,
                            type: 'standard',
                        }]);
                    }

                    return
                })

                .catch(() => notificate("warning", "One or more playlists cannot be listed due by error, maybe timeout or scrapping fail."));      
        }
    }

    useEffect(() => {
        playlists.splice(0, 5).forEach((i: PlaylistSearch) => load(i));

    }, [ playlists ]);

    const handleScroll = (e: any) => {
        if (e.target.scrollHeight - e.target.scrollTop === document.documentElement.scrollHeight) {
            if (allPlaylists.length < playlistsCount) {
                playlists.splice(0, 3).forEach(i => load(i));

                e.target.scrollTo(0, e.target.scrollTop - 250);
            }
        }
    }

    const handleSaveArtist = () => {
        if (window.localStorage.getItem('playlists') !== null) {
            const playlists = JSON.parse(window.localStorage.getItem('playlists')!);

            playlists.unshift({
                ...artist,
            });

            window.localStorage.setItem('playlists', JSON.stringify(playlists));

        } else {
            window.localStorage.setItem('playlists', JSON.stringify([{
                ...artist,
            }]));
        }

        saveRef.current!.src = Saved;

        setArtistAlreadySaved(true);
        
        window.dispatchEvent(new Event('playlistsaved'));
    }

    const handleRemoveArtist = () => {
        const playlists = JSON.parse(window.localStorage.getItem('playlists')!);
        
        window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((i: Video) => i.id !== artist.id)));

        window.dispatchEvent(new Event('playlistsaved'));
    
        saveRef.current!.src = Save;
    
        setArtistAlreadySaved(false);
    }

    return (
        <Container onScroll={ e => handleScroll(e) }>
            <div className="background" style={{ backgroundImage: `url("${ artist.photo }")` }}></div>
            
            <img id="back" src={ Back } width={ 20 } onClick={ () => setArtistModalOpened(false) } />
            
            <div className="content">
                <div className="title-artist">
                    <div className="title-thumbnail" style={{ backgroundImage: `url("${ artist.photo }")` }} />

                    <div className="stats">
                        <h1>{ artist.name }</h1>

                        <p>{ playlistsCount } albums, EPs and singles</p>
                    
                        <div className="buttons">
                            <img
                                src={ artistAlreadySaved ? Saved : Save }
                                id="save"
                                ref={ saveRef }
                                width={ 24 }
                                style={{ padding: '0.65rem' }}
                                onClick={ artistAlreadySaved ? () => handleRemoveArtist() : () => handleSaveArtist() }
                            />
                        </div>
                    </div>
                </div>


                <div className="playlists">
                    {
                        allPlaylists && allPlaylists.length > 0
                            ? allPlaylists.map((i, k) => (
                                <ArtistPlaylist
                                    playlist={ i }
                                    key={ k }
                                />
                            ))
                            : <ReactLoading width={ 54 } color="#222" type="spin" className="spinner" />
                    }
                </div>
            </div>        
        </Container>
    );
}
