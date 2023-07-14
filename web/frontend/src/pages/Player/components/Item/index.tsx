import axios from 'axios';

import { Container } from './styles';

import { notificate } from '../../../../utils/notifications';

import { duration as durationFormat } from '../../../../utils/time';

import Play from '../../../../assets/play.svg';
import AddToQueue from '../../../../assets/addtoqueue.svg';

export const Item = ({ thumb, title, author, views, duration, id, setCurrentAudio, setCurrentStats }: {
    thumb: string,
    title: string,
    author: string,
    views: string,
    duration: string,
    id: string
    setCurrentAudio: Function,
    setCurrentStats: Function,
}) => {
    const handleSetAudio = () => {
        axios.get(`http://localhost:3001/audio?id=${ id }`)
            .then(({ data }) => {
                setCurrentStats({ thumb, title, author, id, duration });

                setCurrentAudio(data.audio);

                window.localStorage.setItem('lastsong', JSON.stringify({
                    thumb,
                    title,
                    author,
                    id,
                    views,
                    duration,
                    audio: data.audio,
                }));

                window.localStorage.setItem('songqueue', JSON.stringify([]));

                window.dispatchEvent(new Event('newqueue'));
            })

            .catch(() => {
                notificate('warning', 'Trying to get audio...');

            });
    }

    const handleAddToQueue = () => {
        if (window.localStorage.getItem('songqueue') !== null) {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

            songQueue.push({
                thumb,
                title,
                author,
                id,
                views,
                duration,
            });

            window.localStorage.setItem('songqueue', JSON.stringify(songQueue));

            if (songQueue.length === 1) {
                window.dispatchEvent(new Event('newqueue'));

            }

        } else {
            window.localStorage.setItem('songqueue', JSON.stringify([{
                thumb,
                title,
                author,
                id,
                views,
                duration,
            }]));

            window.dispatchEvent(new Event('newqueue'));
        }

        const addButton: HTMLImageElement = document.querySelector(`.addToQueue-${ id }`)!;

        addButton.style.scale = '1.3';
        
        setTimeout(() => addButton.style.scale = '1', 300);
    }
    
    return (
        <Container>
            <div className="title">
                <img src={ Play } width={ 28 } onClick={ () => handleSetAudio() } id="control" />

                <img
                    src={ AddToQueue }
                    width={ 20 }
                    id="control"
                    style={{ marginRight: '0.3rem' }}
                    onClick={ () => handleAddToQueue() }
                    className={ `addToQueue-${ id }` }
                />

                <div className="thumbnail" style={{ backgroundImage: `url('${ thumb }')` }} />

                <p title={ title }>{ title.length >= 80 ? title.replace("\\u0026", "&").substring(0, 79) + '...' : title.replace("\\u0026", "&") } · <span>{ author.replace("\\u0026", "&") }</span></p>
            </div>
            
            <div className="stats">
                {
                    <>
                        <p>{ views }</p>

                        <p>{ duration.includes(':') ? duration : durationFormat(Number(duration)) }</p>
                    </>
                }
            </div>
        </Container>
    );
}
