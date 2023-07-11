import axios from 'axios';

import { Container } from './styles';

import Play from '../../../../assets/play.svg';

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
                setCurrentStats({ thumb, title, author: user });

                setCurrentAudio(data.audio);
            })

            .catch(() => {});
    }
    
    return (
        <Container>
            <div className="title">
                <img src={ Play } width={ 28 } onClick={ () => handleSetAudio() } />

                <img src={ thumb } width={ 128 } height={ 72 } />

                <p>{ title.length >= 60 ? title.substring(0, 59) + '...' : title } · <span>{ user }</span></p>
            </div>
            
            <div className="stats">
                <p>{ Intl.NumberFormat('pt-BR').format(views) }</p>

                <p>{ duration }</p>
            </div>
        </Container>
    );
}
