import axios from 'axios';

import { Container } from './styles';

import { duration as durationFormat } from '../../../../utils/time';

import Play from '../../../../assets/play.svg';
import AddToQueue from '../../../../assets/addtoqueue.svg';

export const Item = ({ thumb, title, user, views, duration, id, setCurrentAudio, setCurrentStats }: {
        thumb: string,
        title: string,
        user: string,
        views: number,
        duration: string,
        id: string
        setCurrentAudio: Function,
        setCurrentStats: Function,
    }) => {

    const handleSetAudio = () => {
        axios.get(`http://localhost:3001/audio?id=${ id }`)
            .then(({ data }) => {
                setCurrentStats({ thumb, title, author: user, id });

                setCurrentAudio(data.audio);

                window.localStorage.setItem('lastsong', JSON.stringify({
                    thumb,
                    title,
                    author: user,
                    id,
                    audio: data.audio,
                }));

                window.localStorage.setItem('songqueue', JSON.stringify([]));
            })

            .catch(() => {}); 


    }

    const handleAddToQueue = () => {
        if (window.localStorage.getItem('songqueue') !== null) {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);

            songQueue.push({
                thumb,
                title,
                author: user,
                id,
            });

            window.localStorage.setItem('songqueue', JSON.stringify(songQueue));

            if (songQueue.length === 1) {
                window.dispatchEvent(new Event('newqueue'));

            }

        } else {
            window.localStorage.setItem('songqueue', JSON.stringify([{
                thumb,
                title,
                author: user,
                id,
            }]));

            window.dispatchEvent(new Event('newqueue'));
        }
    }
    
    return (
        <Container>
            <div className="title">
                <img src={ Play } width={ 28 } onClick={ () => handleSetAudio() } id="control" />

                <img src={ AddToQueue } width={ 20 } id="control" style={{ marginRight: '0.3rem' }} onClick={ () => handleAddToQueue() } />

                <img src={ thumb } width={ 128 } />

                <p title={ title }>{ title.length >= 60 ? title.substring(0, 59) + '...' : title } · <span>{ user }</span></p>
            </div>
            
            <div className="stats">
                {
                    isNaN(Number(views))
                        ? <p>{ duration.split(' ')[0] }</p>
                        : <>
                            <p>{ Intl.NumberFormat('pt-BR').format(views) }</p>

                            <p>{ duration.includes(':') ? duration : durationFormat(Number(duration)) }</p>
                        </>
                }
            </div>
        </Container>
    );
}
