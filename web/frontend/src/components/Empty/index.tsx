import { Container } from './styles';

import { Empty as IEmpty } from '../../types';

import HomeEmpty from '../../assets/homeempty.svg';
import MusicPlayerEmpty from '../../assets/musicplayerempty.svg';

export const Empty = ({ type }: { type: string }) => {
    const types = {
        home: {
            image: HomeEmpty,
            text: "There's nothing here. :/",
            width: '40%',
        },
        musicplayer: {
            image: MusicPlayerEmpty,
            text: "Queue empty, try to search for a song or play a list. :)",
            width: '30%',
        },
    };

    // @ts-ignore
    let empty: IEmpty = {};

    switch (type) {
        case 'musicplayer': empty = types.musicplayer; break;
        default: empty = types.home;
    }

    return (
        <Container style={
            type === 'queue' || type === 'notifications'  ? {
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            } : {}
        }>
            <img src={ empty.image } width={ empty.width } />

            <h3>{ empty.text }</h3>
        </Container>
    );
}
