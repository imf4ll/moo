import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import Back from '../../../../assets/back.svg';
import Save from '../../../../assets/heart.svg';
import Saved from '../../../../assets/heartfilled.svg';

import { notificate } from '../../../../utils/notifications';

import { Container } from './styles';

import { ArtistPlaylist } from '../ArtistPlaylist';

import { Video, PlaylistSearch, Playlist } from '../../../../types';

export const ArtistModal = ({ setArtistModalOpened, setArtist, artist }: {
    setArtistModalOpened: Function,
    setArtist: Function,
    artist: {
        id: string,
        photo: string,
        name: string,
    },
}) => {
    const [ playlists, setPlaylists ] = useState<Array<PlaylistSearch>>([]);
    const [ allPlaylists, setAllPlaylists ] = useState<Array<Playlist>>([]);
    const [ artistAlreadySaved, setArtistAlreadySaved ] = useState<boolean>(false);
    const [ playlistsCount, setPlaylistsCount ] = useState<number>(0);

    useEffect(() => {
        const playlists = window.localStorage.getItem('playlists');

        if (playlists !== null) {
            if (JSON.parse(playlists).filter((i: Video) => i.id === artist.id).length > 0) {
                setArtistAlreadySaved(true);

            }
        }

        axios.get(`http://localhost:3001/artist?id=${ artist.id }`)
            .then(({ data }) => {
                setPlaylists(data.playlists);

                setPlaylistsCount(data.playlists.length);
            })

            .catch(() => {
                notificate("error", "Failed to retrieve data from artist.");

                setArtistModalOpened(false);
            });
    }, []);

    const load = (p: PlaylistSearch) => {
        if (allPlaylists.length < playlistsCount) {
            axios.get(`http://localhost:3001/playlist?list=${ p.id }`)
                .then(({ data }) => {
                    if (data.videos.length > 0) {
                        setAllPlaylists(playlist => [...playlist, {
                            videos: data.videos,
                            title: p.title,
                            thumb: p.thumb,
                            songs: p.songs,
                            id: p.id,
                        }]);
                    }

                    return
                })

                .catch(() => notificate("warning", "One or more playlists cannot be listed due by error."));      
        }
    }

    useEffect(() => {
        playlists.splice(0, 5).forEach((i: PlaylistSearch) => load(i));

    }, [ playlists ]);

    const handleScroll = (e: any) => {
        if (e.target.scrollHeight - e.target.scrollTop === document.documentElement.scrollHeight) {
            if (allPlaylists.length < playlistsCount) {
                playlists.splice(0, 5).forEach(i => load(i));

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

        document.querySelector<HTMLImageElement>('#save')!.src = Saved;

        setArtistAlreadySaved(true);
        
        window.dispatchEvent(new Event('playlistsaved'));
    }

    const handleRemoveArtist = () => {
        const playlists = JSON.parse(window.localStorage.getItem('playlists')!);
        
        window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((i: Video) => i.id !== artist.id)));

        window.dispatchEvent(new Event('playlistsaved'));
    
        document.querySelector<HTMLImageElement>('#save')!.src = Save;
    
        setArtistAlreadySaved(false);
    }

    return (
        <Container onScroll={ e => handleScroll(e) }>
            <div className="background" style={{ backgroundImage: `url("${ artist.photo }")` }}></div>
            
            <img id="back" src={ Back } width={ 20 } onClick={ () => {
                setArtistModalOpened(false);

                setArtist({});
            }}
            />
            
            <div className="content">
                <div className="title-playlist">
                    <div className="title-thumbnail" style={{ backgroundImage: `url("${ artist.photo }")` }} />

                    <div className="stats">
                        <h1>{ artist.name }</h1>

                        <p>{ playlistsCount } albums, EPs and singles</p>
                    
                        <div className="buttons">
                            <img
                                src={ artistAlreadySaved ? Saved : Save }
                                id="save"
                                width={ 28 }
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
