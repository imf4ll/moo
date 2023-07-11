import { useState } from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

import { ItemProps } from '../../types';

import { Navbar } from '../../components/Navbar';
import { Queue } from '../../components/Queue';
import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { Item } from './components/Item';
import { Empty } from '../../components/Empty';

export const Player = () => {
    const [ queueOpened, setQueueOpened ] = useState<boolean>(false);
    const [ videos, setVideos ] = useState<Array<ItemProps>>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ currentAudio, setCurrentAudio ] = useState<string>("");
    const [ currentStats, setCurrentStats ] = useState<ItemProps>({
        thumb: 'https://4.bp.blogspot.com/--OiScnnTPiU/Va-HwLLdONI/AAAAAAAAILs/_97hmfQLl8M/s1600/fundo-cinza-fundos%2B%25289%2529.jpg',
        title: 'Not playing',
        author: '',
    });

    return (
        <>
            <Navbar setQueueOpened={ setQueueOpened } />

            {
                queueOpened && <Queue queueOpened={ setQueueOpened } />
            }

            <Container>
                <Header setVideos={ setVideos } setLoading={ setLoading } />

                <div className="items">
                    { videos.length > 0 && !loading ?
                        videos.map((i, k) => (
                            <Item
                                key={ k }
                                thumb={ i.thumb }
                                title={ i.title }
                                user={ i.author }
                                views={ i.views }
                                id={ i.id }
                                duration={ i.length }
                                setCurrentAudio={ setCurrentAudio }
                                setCurrentStats={ setCurrentStats }
                            />
                        ))
                        : loading 
                            ? <ReactLoading type="spin" color="#999" width={ 24 } className="spinner" />
                            : <Empty type="musicplayer" />
                    }
                </div>
                
                <AudioPlayer
                    currentAudio={ currentAudio }
                    currentStats={ currentStats }
                />
            </Container>
        </>
    );
}
