import { useEffect, useState, useRef } from 'react';

import { Background, Container } from './styles';

import { notificate } from '../../../../utils/notifications';
import { api } from '../../../../utils/api';

export const NewPlaylistModal = ({ setNewPlaylistModalOpened }: { setNewPlaylistModalOpened: Function }) => {
    const [ title, setTitle ] = useState<string>('');
    const [ playlist, setPlaylist ] = useState<{ thumb: string, id: string, title?: string }>({
        title: '',
        thumb: '',
        id: '',
    });
    const saveRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onKeydown = window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                setNewPlaylistModalOpened(false);

            }
        });

        // @ts-ignore
        window.removeEventListener('keydown', onKeydown);

        const onURLKeydown = urlRef.current!.addEventListener('input', (e: any) => {
            if (e.target!.value === '') {
                // @ts-ignore
                setPlaylist({});
            }

            if (!e.target!.value.includes("/playlist?list=")) return;

            const id = e.target!.value.split("list=")[1];

            api.get(`/playlist?id=${ id }`)
                .then(({ data }) => {
                    setPlaylist({
                        id,
                        thumb: data.videos[0].thumb,
                    });
                })

                .catch(() => notificate('error', 'Failed to get playlist.'));
        });

        // @ts-ignore
        urlRef.current!.removeEventListener('input', onURLKeydown);

    }, []);

    useEffect(() => {
        const onTitleInput = titleRef.current!.addEventListener('input', (e: any) => setTitle(e.target!.value !== '' ? e.target!.value : ''));

        // @ts-ignore
        titleRef.current!.removeEventListener('input', onTitleInput);

    }, [ playlist ]);

    const handleSave = () => {
        if (window.localStorage.getItem('playlists') !== null) {
            const playlists = JSON.parse(window.localStorage.getItem('playlists')!);

            playlists.unshift({
                ...playlist,
                title,
                type: 'custom',
            });

            window.localStorage.setItem('playlists', JSON.stringify(playlists));

        } else {
            window.localStorage.setItem('playlists', JSON.stringify([{
                ...playlist,
                title,
                type: 'custom',
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

                <div style={{ backgroundImage: `url('${ playlist && playlist.thumb }')` }} className="background"></div>

                <div className="buttons">
                    <input type="button" id="cancel" value="Cancel" onClick={ () => setNewPlaylistModalOpened(false) } />
                    
                    <input type="button" id="save" disabled={ title === '' } ref={ saveRef } className="save" value="Save" onClick={ () => handleSave() } />
                </div>
            </Container>
        </>
    );
}
