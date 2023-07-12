import { useEffect, useState } from 'react';
import axios from 'axios';

import { Background, Container } from './styles';

import ImageBackground from '../../../../assets/background.jpg';

export const PlaylistModal = ({ setPlaylistModalOpened }: { setPlaylistModalOpened: Function }) => {
    const [ title, setTitle ] = useState<string>('');
    const [ thumb, setThumb ] = useState<string>('');
    const [ playlist, setPlaylist ] = useState<{ thumb: string, title: string, id: string, author: string }>({
        title: '',
        thumb: '',
        id: '',
        author: '',
    });

    useEffect(() => {
        document.querySelector<HTMLInputElement>('#save')!.disabled = true;

        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                setPlaylistModalOpened(false);

            }
        });

        document.querySelector('#url')!.addEventListener('keydown', e => {
            if (e.target!.value === '') { return };

            if (e.key === 'Enter') {
                axios.get(`http://localhost:3001/addPlaylist?list=${ e.target!.value.split("list=")[1] }`)
                    .then(({ data }) => {
                        setPlaylist(data.videos);
                        setThumb(data.videos[0].thumb);

                        document.querySelector<HTMLImageElement>('#image')!.src = data.videos[0].thumb;
                    })

                    .catch(() => {});
            }
        });

    }, []);

    useEffect(() => {
        document.querySelector('#title')!.addEventListener('input', e => {
            const saveBtn: HTMLInputElement = document.querySelector('#save')!;

            if (e.target!.value !== '') {
                saveBtn.disabled = false;

            } else {
                saveBtn.disabled = true;

            }
            
            setTitle(e.target!.value);
        });

    }, [ playlist ]);

    const handleSave = () => {
        if (window.localStorage.getItem('playlists') !== null) {
            const playlists = JSON.parse(window.localStorage.getItem('playlists')!);

            playlists.push({
                videos: playlist,
                title,
                thumb,
            });

            window.localStorage.setItem('playlists', JSON.stringify(playlists));

        } else {
            window.localStorage.setItem('playlists', JSON.stringify([{
                videos: playlist,
                title,
                thumb,
            }]));
        }

        setPlaylist({});
        
        setPlaylistModalOpened(false);

        window.dispatchEvent(new Event('playlistsaved'));
    }

    return (
        <>
            <Background onClick={ () => setPlaylistModalOpened(false) } />

            <Container>
                <div>
                    <p>URL:</p>

                    <input type="text" id="url" placeholder="Playlist URL from YouTube" />
                </div>

                <div>
                    <p>Title:</p>

                    <input type="text" id="title" maxLength={ 16 } placeholder="Playlist title" />
                </div>

                <img src={ ImageBackground } width={ 200 } height={ 200 } id="image" />

                <input type="button" id="save" className="save" value="Save" onClick={ () => handleSave() } />
            </Container>
        </>
    );
}
