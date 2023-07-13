import axios from 'axios';
import { useEffect } from 'react';

import { Container } from './styles';
import { notificate } from '../../../../utils/notifications';

import { Notifications } from '../../../../components/Notifications';

import Logo from '../../../../../public/icon.png';
import LogoBackground from '../../../../../public/iconbackground.png';
import Search from '../../../../assets/search.svg';
import Clear from '../../../../assets/close.svg';
import More from '../../../../assets/more.svg';

export const Header = ({ setVideos, setLoading, setPlaylistsToAdd, moreOptionsOpened, setMoreOptionsOpened }: {
        setVideos: Function,
        setLoading: Function,
        setPlaylistsToAdd: Function,
        moreOptionsOpened: boolean,
        setMoreOptionsOpened: Function,
    }) => {

    const handleSearch = (type: string, value: string) => {
        setVideos([]);
        setLoading(true);
        
        (async () => 
            await axios.get('http://localhost:3001/' + ( type === 'search' ? `search?query=${ value }&mode=player` : `video?id=${ value.substring(value.length - 11) }`))
                .then(r => {
                    setVideos(type === 'video' ? [ r.data.video ] : r.data.videos);

                    setPlaylistsToAdd(r.data.playlists);
                    
                    setLoading(false);
                })

                .catch(() => {
                    setVideos([]);

                    setLoading(false);

                    setPlaylistsToAdd([]);

                    notificate('error', 'to search.');

                    window.dispatchEvent(new Event('newnotification'));
                })
        )();
    }

    useEffect(() => {
        const bar = document.querySelector<HTMLInputElement>('#bar')!;
        const search = document.querySelector<HTMLImageElement>('#search')!;

        bar.addEventListener('keydown', (e: any) => {
            if (e.target.value === '') return;

            if (e.key === 'Enter') {
                if (e.target.value.includes('youtube.com/watch?v=') || e.target.value.includes('youtu.be')) {
                    handleSearch('video', e.target.value);
                
                } else {
                    handleSearch('search', e.target.value);

                }
            }
        });

        search.addEventListener('click', () => {
            const bar = document.querySelector<HTMLInputElement>('#bar')!.value;
            
            if (bar === '') return;

            if (bar.includes('youtube.com/watch?v=') || bar.includes('youtu.be')) {
                handleSearch('video', bar);

            } else {
                handleSearch('search', bar);

            }
        });

    }, []);

    return (
        <Container>
            <div className="logo">
                <img src={ LogoBackground } id="background" width={ 32 } />
                <img src={ Logo } width={ 32 } />
            </div>

            <div className="searchBar">
                <input type="text" id="bar" placeholder="Search for a music or artist" />

                <div className="bar-buttons">
                    <img src={ Search } id="search" width={ 24 } />
                    <img src={ Clear } width={ 26 } onClick={ () => { setVideos([]); setPlaylistsToAdd([]); } } />
                </div>
            </div>

            <div className="buttons">
                <Notifications position="relative" />

                <img src={ More } width={ 32 } onClick={ () => setMoreOptionsOpened(!moreOptionsOpened) } />
            </div>
        </Container>
    );
}
