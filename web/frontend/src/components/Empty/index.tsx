import { Container } from './styles';

import { Empty as IEmpty } from '../../types';

import HomeEmpty from '../../assets/homeempty.svg';
import QueueEmpty from '../../assets/queueempty.svg';
import MusicPlayerEmpty from '../../assets/musicplayerempty.svg';
import NotificationsEmpty from '../../assets/notificationsempty.svg';

export const Empty = ({ type }: { type: string }) => {
    const types = {
        home: {
            image: HomeEmpty,
            text: "There's nothing here. :/",
            width: '40%',
        },
        queue: {
            image: QueueEmpty,
            text: 'Queue empty. >:(',
            width: '60%',
        },
        musicplayer: {
            image: MusicPlayerEmpty,
            text: "There's nothing here. :/",
            width: '30%',
        },
        notifications: {
            image: NotificationsEmpty,
            text: "There's nothing here. :/",
            width: '70%',
        }
    };

    // @ts-ignore
    let empty: IEmpty = {};

    switch (type) {
        case 'queue': empty = types.queue; break;
        case 'musicplayer': empty = types.musicplayer; break;
        case 'notifications': empty = types.notifications; break;
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
