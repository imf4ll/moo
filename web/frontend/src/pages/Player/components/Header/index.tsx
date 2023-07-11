import axios from 'axios';
import { useEffect } from 'react';

import { Container } from './styles';

import { Notifications } from '../../../../components/Notifications';

import Search from '../../../../assets/search.svg';

export const Header = ({ setVideos, setLoading }: { setVideos: Function, setLoading: Function }) => {
    const handleSearch = (type: string, value: string) => {
        setVideos([]);
        setLoading(true);
        
        (async () =>                                                                                                                                                         await axios.get('http://localhost:3001/' + ( type === 'search' ? `search?query=${ value }` : `video?id=${ value.substring(value.length - 11) }`))
                .then(r => {
                    setVideos(type === 'video' ? [ r.data.video ] : r.data.videos);
                    
                    setLoading(false);
                })

                .catch(() => {
                    setVideos([]);
                    setLoading(false);
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
            <div></div>

            <div className="searchBar">
                <input type="text" id="bar" placeholder="Search for a music or artist" />

                <img src={ Search } id="search" width={ 22 } />
            </div>

            <Notifications position="relative" />
        </Container>
    );
}
