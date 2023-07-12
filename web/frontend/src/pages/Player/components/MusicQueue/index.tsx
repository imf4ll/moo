import { useEffect, useState } from 'react';

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
                songs.length > 0 &&
                    songs.map((i, k) => (
                        <div key={ k } className="item">
                            <img src={ i.thumb } width={ 80 } height={ 64 }  />

                            <p>{ i.title.length > 40 ? i.title.substring(0, 39) + '...' : i.title }</p>
                        </div>
                    ))
            }
        </Container>
    );
}
