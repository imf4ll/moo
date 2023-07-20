import { useEffect, useState, useRef } from 'react';

import { Container } from './styles';

import { notificate } from '../../../../utils/notifications';
import { api } from '../../../../utils/api';

import Logo from '../../../../../public/icon.png';
import LogoBackground from '../../../../../public/iconbackground.png';
import Search from '../../../../assets/search.svg';
import Clear from '../../../../assets/close.svg';
import More from '../../../../assets/more.svg';
import Less from '../../../../assets/less.svg';
import Downloading from '../../../../assets/downloading.svg';

export const Header = ({ setVideos, setLoading, setPlaylistsToAdd, moreOptionsOpened, setMoreOptionsOpened, setArtist }: {
    setVideos: Function,
    setLoading: Function,
    setPlaylistsToAdd: Function,
    moreOptionsOpened: boolean,
    setMoreOptionsOpened: Function,
    setArtist: Function,
}) => {
    const [ downloading, setDownloading ] = useState<boolean>(false);
    const [ searchHistory, setSearchHistory ] = useState<Array<string>>([]);
    const barRef = useRef<HTMLInputElement>(null);
    const searchRef = useRef<HTMLImageElement>(null);

    const handleSearch = (value: string) => {
        setVideos([]);
        setLoading(true);
        
        api.get(`/search?query=${ value }`)
            .then(({ data }) => {
                setVideos(data.videos);

                setPlaylistsToAdd(data.playlists);

                setArtist(data.artist);
                
                setLoading(false);

                setSearchHistory(p => [ ...p.filter(i => i !== value), value.trim() ]);
            })

            .catch(() => {
                setVideos([]);

                setPlaylistsToAdd([]);
                
                setArtist({});
                
                setLoading(false);

                notificate('error', 'Failed to search, try again.');

                window.dispatchEvent(new Event('newnotification'));
            });
    }

    useEffect(() => {
        const searchHist = window.localStorage.getItem('searchhistory');

        if (barRef.current!.value !== '') {
            if (searchHist !== null) {
                const hist = JSON.parse(searchHist).filter((i: string) => i !== barRef.current!.value);

                hist.unshift(barRef.current!.value.trim());

                window.localStorage.setItem('searchhistory', JSON.stringify(hist.splice(0, 11)));

            } else {
                window.localStorage.setItem('searchhistory', JSON.stringify([ barRef.current!.value ]));

            }
    }

    }, [ searchHistory ]);

    useEffect(() => {
        if (window.localStorage.getItem('searchhistory') !== null) {
            setSearchHistory(JSON.parse(window.localStorage.getItem('searchhistory')!));

        }

        const onBarInput = barRef.current!.addEventListener('input', (e: any) => {
            if (e.target!.value === '') {
                setVideos([]);

                setPlaylistsToAdd([]);
            }
        });
        
        // @ts-ignore
        barRef.current!.removeEventListener('input', onBarInput);

        const onBarKeydown = barRef.current!.addEventListener('keydown', (e: any) => {
            if (e.target.value === '') return;

            if (e.key === 'Enter') {
                handleSearch(barRef.current!.value);

            }
        });

        // @ts-ignore
        barRef.current!.removeEventListener('keydown', onBarKeydown);

        const onSearchClick = searchRef.current!.addEventListener('click', () => {
            if (barRef.current!.value === '') return;

            handleSearch(barRef.current!.value);
        });

        // @ts-ignore
        searchRef.current!.removeEventListener('click', onSearchClick);
        
        const onDownloading = window.addEventListener('downloading', () => setDownloading(true));
        const onIdle = window.addEventListener('idle', () => setDownloading(false));

        // @ts-ignore
        window.removeEventListener('downloading', onDownloading);
        // @ts-ignore
        window.removeEventListener('idle', onIdle);
    
    }, []);

    const handleClear = () => {
        setVideos([]);

        setPlaylistsToAdd([]);

        setArtist({});

        barRef.current!.value = '';
    }

    return (
        <Container>
            <div className="logo">
                <img src={ LogoBackground } id="background" width={ 32 } />
                <img src={ Logo } width={ 32 } />
            </div>

            <div className="searchBar">
                <input type="text" id="bar" ref={ barRef } placeholder="Search" list="list" autoComplete="off" />

                <datalist id="list">
                    {
                        searchHistory && searchHistory.length > 0
                            && searchHistory.map((i, k) => (<option key={ k }>{ i }</option>))
                    }
                </datalist>

                <div className="bar-buttons">
                    <img src={ Search } ref={ searchRef } id="search" width={ 24 } />
                    <img src={ Clear } width={ 26 } onClick={ () => { handleClear() } } />
                </div>
            </div>

            <div className="buttons">
                <img src={ downloading && Downloading } id="downloading" width={ 24 } />

                <img src={ moreOptionsOpened ? Less : More } width={ 32 } onClick={ () => setMoreOptionsOpened(!moreOptionsOpened) } />
            </div>
        </Container>
    );
}
