import { Container } from './styles';

import { Empty as IEmpty } from '../../types';

import HomeEmpty from '../../assets/homeempty.svg';
import QueueEmpty from '../../assets/queueempty.svg';

export const Empty = ({ type }: { type: string }) => {
    const types = {
        home: {
            image: HomeEmpty,
            text: 'Try to make a search or insert a URL on the top bar.',
            width: '40%',
        },
        queue: {
            image: QueueEmpty,
            text: 'Queue empty.',
            width: '60%',
        }
    };

    // @ts-ignore
    let empty: IEmpty = {};

    if (type === 'home') {
        empty = types.home;

    } else {
        empty = types.queue;

    }

    return (
        <Container>
            <img src={ empty.image } width={ empty.width } />

            <h3>{ empty.text }</h3>
        </Container>
    );
}
