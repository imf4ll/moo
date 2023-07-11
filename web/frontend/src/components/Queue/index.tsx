import { useEffect, useState } from 'react';

import { Container } from './styles';

import { QueueItemProps } from '../../types';

import Close from '../../assets/close.svg';

import { QueueItem } from '../QueueItem';
import { Empty } from '../Empty';

export const Queue = ({ queueOpened }: { queueOpened: Function }) => {
    const [ queue, setQueue ] = useState<Array<QueueItemProps>>([]);

    useEffect(() => {
        const queue = window.localStorage.getItem('queue');

        setQueue(JSON.parse(queue!));

        // @ts-ignore
        setTimeout(() => document.querySelector('#container-queue')!.style.right = 0, 1);
    }, []);

    window.onstorage = () => setQueue(JSON.parse(window.localStorage.getItem('queue')!));

    return (
        <>
            <Container id="container-queue" onMouseLeave={ () => queueOpened(false) }>
                {
                    window.innerWidth < 800 &&
                        <img
                            src={ Close }
                            onClick={ () => queueOpened(false) }
                            id="close"
                            width={ 36 }
                        />
                }

                <div className="items">
                    {
                        queue.length > 0
                            ? queue.reverse().map((i, k) => (
                                <QueueItem
                                    title={ i.title }
                                    author={ i.author }
                                    views={ i.views }
                                    length={ i.length }
                                    thumb={ i.thumb }
                                    downloading={ i.downloading }
                                    failed={ i.failed }
                                    key={ k }
                                />
                            ))
                            : <Empty type="queue" />
                    }
                </div>
            </Container>
        </>
    );
}
