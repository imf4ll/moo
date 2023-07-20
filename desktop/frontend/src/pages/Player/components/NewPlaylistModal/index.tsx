import { useEffect, useState, useRef } from 'react';

import { Background, Container } from './styles';

import { notificate } from '../../../../utils/notifications';
import { api } from '../../../../utils/api';

export const NewPlaylistModal = ({ setNewPlaylistModalOpened }: { setNewPlaylistModalOpened: Function }) => {
    const [ title, setTitle ] = useState<string>('');
    const [ thumb, setThumb ] = useState<string>('');
    const [ playlist, setPlaylist ] = useState<{ thumb: string, title: string, id: string, author: string }>({
        title: '',
        thumb: '',
        id: '',
        author: '',
    });
    const saveRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                setNewPlaylistModalOpened(false);

            }
        });

        urlRef.current!.addEventListener('keydown', (e: any) => {
            if (e.target!.value === '') { return };

            if (e.key === 'Enter') {
                api.get(`/playlist?id=${ e.target!.value.split("list=")[1] }`)
                    .then(({ data }) => {
                        setPlaylist(data.videos);

                        setThumb(data.videos[0].thumb);
                    })

                    .catch(() => notificate('error', 'Failed to get playlist.'));
            }
        });

    }, []);

    useEffect(() => {
        titleRef.current!.addEventListener('input', (e: any) => {
            if (e.target!.value !== '') {
                saveRef.current!.disabled = false;

            } else {
                saveRef.current!.disabled = true;

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
                    <input type="text" id="url" ref={ urlRef } placeholder="Playlist URL" />

                    <input type="text" id="title" ref={ titleRef } maxLength={ 24 } placeholder="Title" />
                </div>

                <div style={{ backgroundImage: `url('${ thumb }')` }} className="background"></div>

                <div className="buttons">
                    <input type="button" id="cancel" value="Cancel" onClick={ () => setNewPlaylistModalOpened(false) } />
                    
                    <input type="button" id="save" ref={ saveRef } className="save" value="Save" onClick={ () => handleSave() } />
                </div>
            </Container>
        </>
    );
}
