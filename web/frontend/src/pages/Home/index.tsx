import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { Container, Items } from './styles';

import { SearchBar } from '../../components/SearchBar';
import { Empty } from '../../components/Empty';
import { Item } from '../../components/Item';
import { Navbar } from '../../components/Navbar';
import { Queue } from '../../components/Queue';

import { ItemProps } from '../../types';

export const Home = () => {
    const [ videos, setVideos ] = useState<Array<ItemProps>>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ queueOpened, setQueueOpened ] = useState<boolean>(false);

    useEffect(() => {
        if (window.localStorage.getItem('settings') === null) {
            toast('Moving to /settings for first tweaks.', {
                type: 'warning',
                theme: 'dark',
                pauseOnHover: true,
                delay: 3000,
                onClose: () => window.location.href = '/settings',
            });
        }

        if (window.localStorage.getItem('queue') === null) {
            window.localStorage.setItem('queue', JSON.stringify([]));

        }

    }, []);

    return (
        <>
            <Navbar setQueueOpened={ setQueueOpened } />

            {
                queueOpened && <Queue queueOpened={ setQueueOpened } />
            }

            <Container>
                <SearchBar setVideos={ setVideos } setLoading={ setLoading } />
            
                {
                    videos.length > 0 && !loading
                        ? ( <Items id="items"> 
                           {    videos.map((i, k) => (
                                    <Item
                                        key={ k }
                                        thumb={ i.thumb }
                                        title={ i.title }
                                        author={ i.author }
                                        views={ Number(i.views) }
                                        length={ i.length }
                                        id={ i.id }
                                        queueOpened={ setQueueOpened }
                                    />
                                ))
                           }
                           </Items> )
                        : loading
                            ? <ReactLoading type="cylon" color="#999" width={ 48 } />
                            : <Empty type="home" />
                    }
                </Container>
        </>
    );
}
