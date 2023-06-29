import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { Container, Items } from './styles';

import { SearchBar } from '../../components/SearchBar';
import { Empty } from '../../components/Empty';
import { Item } from '../../components/Item';
import { Navbar } from '../../components/Navbar';
import { Queue } from '../../components/Queue';
import { Notifications } from '../../components/Notifications';

import NotificationsBell from '../../assets/notifications.svg';
import NewNotification from '../../assets/newnotification.svg';

import { ItemProps } from '../../types';

import { checkUpdate } from '../../utils/update';
import { notificate } from '../../utils/notifications';
import { version as current } from '../../../package.json';

export const Home = () => {
    const [ videos, setVideos ] = useState<Array<ItemProps>>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ queueOpened, setQueueOpened ] = useState<boolean>(false);
    const [ notificationsOpened, setNotificationsOpened ] = useState<boolean>(false);
    const [ latestVersion, setLatestVersion ] = useState<String>();
    const [ newNotifications, setNewNotifications ] = useState<boolean>();

    useEffect(() => {
        if (window.localStorage.getItem('settings') === null) {
            toast('Moving to /settings for first tweaks.', {
                type: 'warning',
                theme: 'dark',
                pauseOnHover: true,
                delay: 3000,
                onClose: () => window.location.href = '/settings',
            });
        }

        if (window.localStorage.getItem('queue') === null) {
            window.localStorage.setItem('queue', JSON.stringify([]));

        }

        if (window.localStorage.getItem('notifications') === null) {
            window.localStorage.setItem('notifications', JSON.stringify([]));

        }

        (async () => setLatestVersion(await checkUpdate()))();

        const update = JSON.parse(window.localStorage.getItem('update')!);
        const date = Math.floor((Date.now() - update.latestWarning) / 1000 / 60 / 24);

        if (!update.updated && date > 7) {
            notificate('update', 'New update available');

        }
    }, []);

    useEffect(() => {
        const notifications = JSON.parse(window.localStorage.getItem('notifications')!);

        notifications.map(i => i.new ? setNewNotifications(true) : setNewNotifications(false));
    });

    useEffect(() => {
        if (window.localStorage.getItem('update') === null) {
            window.localStorage.setItem('update', JSON.stringify({
                updated: true,
                latestWarning: Date.now(),
            }));
        
        } else {
            const update = JSON.parse(window.localStorage.getItem('update')!);
            const date = Math.floor((Date.now() - update.latestWarning) / 1000 / 60 / 24);

            if (current !== latestVersion && date > 7) {
                window.localStorage.setItem('update', JSON.stringify({
                    updated: false,
                    latestVersion: Date.now(),
                }));
            }
        }

    }, [ latestVersion ]);

    return (
        <>
            <Navbar setQueueOpened={ setQueueOpened } />

            {
                queueOpened && <Queue queueOpened={ setQueueOpened } />
            }

            {
                notificationsOpened && <Notifications notificationsOpened={ setNotificationsOpened } />
            }

            <Container>
                <div
                    className="notifications"
                    onClick={ () => setNotificationsOpened(!notificationsOpened) }
                >
                    <img
                        src={ newNotifications ? NewNotification : NotificationsBell }
                        width={ 24 }
                        className={ newNotifications ? "new" : "" }
                    />
                </div>

                <SearchBar setVideos={ setVideos } setLoading={ setLoading } />
            
                {
                    videos.length > 0 && !loading
                        ? ( <Items id="items"> 
                           {    videos.map((i, k) => (
                                    <Item
                                        key={ k }
                                        thumb={ i.thumb }
                                        title={ i.title }
                                        author={ i.author }
                                        views={ Number(i.views) }
                                        length={ i.length }
                                        id={ i.id }
                                        queueOpened={ setQueueOpened }
                                    />
                                ))
                           }
                           </Items> )
                        : loading
                            ? <ReactLoading type="spin" color="#999" width={ 24 } />
                            : <Empty type="home" />
                    }
                </Container>
        </>
    );
}
