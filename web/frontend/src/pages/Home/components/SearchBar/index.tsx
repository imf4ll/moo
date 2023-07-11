import { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Bar, Buttons } from './styles';

import Search from '../../../../assets/search.svg';
import Close from '../../../../assets/close.svg';

interface SearchProps {
    setVideos: Function;
    setLoading: Function;
}

export const SearchBar = ({ setVideos, setLoading }: SearchProps) => {
    const [ searchBarFilled, setSearchBarFilled ] = useState<boolean>(false);

    const handleBarChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.value !== '') {
            setSearchBarFilled(true);

        } else {
            setSearchBarFilled(false);

        }
    }

    const handleClearSearch = () => {
        document.querySelector<HTMLInputElement>('#bar')!.value = '';

        setSearchBarFilled(false);
    }

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
            <Bar
                onChange={ handleBarChange }
                id="bar"
                placeholder="Search or give me a URL"
            />

            <Buttons>
                <img src={ Search } id="search" title="Search" width={ 24 } />

                {
                    searchBarFilled && (
                        <img src={ Close } width={ 24 } title="Clear" onClick={ handleClearSearch } />
                    )
                }
            </Buttons>
        </Container>
    );
}
