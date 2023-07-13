import { useEffect, useState } from 'react';

import { Empty } from '../../../../components/Empty';

import { Container } from './styles';

export const MusicQueue = ({ musicQueueOpened }: { musicQueueOpened: Function }) => {
    const [ songs, setSongs ] = useState<Array<{ thumb: string, title: string, author: string, id: string }>>([]);

    useEffect(() => {
        if (window.localStorage.getItem('songqueue') !== null) {
            setSongs(JSON.parse(window.localStorage.getItem('songqueue')!));

        }

        const handleStorage = () => {
            setSongs(JSON.parse(window.localStorage.getItem('songqueue')!));

        }
        
        window.addEventListener('storage', handleStorage);
        window.addEventListener('musicended', handleStorage);

    }, []);

    return (
        <Container onMouseLeave={ () => musicQueueOpened(false) }>
            {
                songs.length > 0
                    ? songs.map((i, k) => (
                        <div key={ k } className="item">
                            <div className="thumb">
                                <p>{ k + 1 }</p>

                                <img src={ i.thumb } width={ 128 } height={ 80 }  />
                            </div>

                            <p>{ i.title.length > 40 ? i.title.replace("\\u0026", "&").substring(0, 39) + '...' : i.title.replace("\\0026", "&") } ·
                                <span> { i.author }</span>
                            </p>
                        </div>
                    ))
                    : <Empty type="musicqueue" />
            }
        </Container>
    );
}
