import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Background, Container } from './styles';

import { QueueItemProps } from '../../types';

import ClearAll from '../../assets/clear-all.svg';
import Close from '../../assets/close.svg';

import { QueueItem } from '../QueueItem';
import { Empty } from '../Empty';

export const Queue = ({ queueOpened }: { queueOpened: Function }) => {
    const [ queue, setQueue ] = useState<Array<QueueItemProps>>([]);
    const [ clearing, setClearing ] = useState<boolean>(false);

    useEffect(() => {
        const queue = window.localStorage.getItem('queue');

        setQueue(JSON.parse(queue!));

        // @ts-ignore
        setTimeout(() => document.querySelector('#container-queue')!.style.right = 0, 1);
    }, []);

    window.onstorage = () => setQueue(JSON.parse(window.localStorage.getItem('queue')!));

    const handleConfirmClear = () => {
        window.localStorage.setItem('queue', JSON.stringify([]));

        setQueue([]);
       
        setClearing(false);

        toast('Queue cleared.', {
            theme: 'dark',
            type: 'success',
        });
    }

    const handleClear = () => {
        if (queue.length !== 0) {
            setClearing(true);
            
            toast('Press again to confirm clear queue.', {
                theme: 'dark',
                type: 'warning',
            });

        } else {
            toast('Queue is already empty.', {
                theme: 'dark',
                type: 'error',
            });

        }
    }

    return (
        <>
            <Background onClick={ () => queueOpened(false) } />

            <Container id="container-queue">
                {
                    window.innerWidth < 800 &&
                        <img
                            src={ Close }
                            onClick={ () => queueOpened(false) }
                            id="close"
                            width={ 36 }
                        />
                }

                <div className="title-queue">
                    <h1>Queue</h1>

                    <img
                        src={ ClearAll }
                        title="Clear Queue"
                        width={ 32 }
                        onClick={ clearing ? handleConfirmClear : handleClear }
                    />
                </div>

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
