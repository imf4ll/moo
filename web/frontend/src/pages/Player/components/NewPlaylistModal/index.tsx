import { useEffect, useState } from 'react';
import axios from 'axios';

import { Background, Container } from './styles';

import { notificate } from '../../../../utils/notifications';

export const NewPlaylistModal = ({ setNewPlaylistModalOpened }: { setNewPlaylistModalOpened: Function }) => {
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
                setNewPlaylistModalOpened(false);

            }
        });

        document.querySelector('#url')!.addEventListener('keydown', (e: any) => {
            if (e.target!.value === '') { return };

            if (e.key === 'Enter') {
                axios.get(`http://localhost:3001/playlist?id=${ e.target!.value.split("list=")[1] }`)
                    .then(({ data }) => {
                        setPlaylist(data.videos);

                        setThumb(data.videos[0].thumb);
                    })

                    .catch(e => {
                        notificate('error', 'Failed to get playlist.');

                        console.log(e);
                    });
            }
        });

    }, []);

    useEffect(() => {
        document.querySelector('#title')!.addEventListener('input', (e: any) => {
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

            playlists.unshift({
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

        // @ts-ignore
        setPlaylist({});
        
        setNewPlaylistModalOpened(false);

        window.dispatchEvent(new Event('playlistsaved'));
    }

    return (
        <>
            <Background onClick={ () => setNewPlaylistModalOpened(false) } />

            <Container>
                <div className="textboxes">
                    <input type="text" id="url" placeholder="Playlist URL" />

                    <input type="text" id="title" maxLength={ 24 } placeholder="Title" />
                </div>

                <div style={{ backgroundImage: `url('${ thumb }')` }} className="background"></div>

                <div className="buttons">
                    <input type="button" id="cancel" value="Cancel" onClick={ () => setNewPlaylistModalOpened(false) } />
                    
                    <input type="button" id="save" className="save" value="Save" onClick={ () => handleSave() } />
                </div>
            </Container>
        </>
    );
}
