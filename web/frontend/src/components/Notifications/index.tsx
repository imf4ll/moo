import { useState, useEffect } from 'react';

import { Container, Modal } from './styles';

import { Empty } from '../Empty';

import Download from '../../assets/download.svg';
import UpdateAvailable from '../../assets/updateavailable.svg';
import Error from '../../assets/errornotification.svg';
import Inbox from '../../assets/inbox.svg';
import NewNotification from '../../assets/newnotification.png';

interface Notification {
    type: String,
    title: String,
    new: boolean,
    timestamp: Number,
}

export const Notifications = ({ position }: { position: string }) => {
    const [ notifications, setNotifications ] = useState<Array<Notification>>([]);
    const [ notificationsOpened, setNotificationsOpened ] = useState<boolean>(false);
    const [ newNotifications, setNewNotifications ] = useState<boolean>(false);

    useEffect(() => {

    }, []);

    useEffect(() => {
        const onStorage = window.addEventListener('storage', () => {
            const notifications = JSON.parse(window.localStorage.getItem('notifications')!);

            notifications.map(i => i.new ? setNewNotifications(true) : setNewNotifications(false));

            setNotifications(notifications);
        });
        
        window.removeEventListener('storage', onStorage);

        document.querySelector('.notifications')?.addEventListener('click', () => {
            setTimeout(() => {
                notifications.map(i => i.new ? i.new = false : { ...i });

                window.localStorage.setItem('notifications', JSON.stringify(notifications));

                setNewNotifications(false);

            }, 2000);
        })
        
        const notifications: Array<Notification> = JSON.parse(window.localStorage.getItem('notifications')!);
    
        if (notifications !== null) {
            setNotifications(notifications);

        }

    }, []);

    const setSource = (type: String) => {
        if (type === 'download') {
            return Download;
        
        } else if (type === 'update') {
            return UpdateAvailable;

        } else {
            return Error;

        }
    }

    const countTime = (timestamp: number) => {
        const date = Date.now() - timestamp;

        const since = Math.floor(date / 1000 / 60);

        if (since <= 60) {
            return `${ since } minutes ago`;
        
        } else if (since <= 1440) {
            return `${ Math.floor(since / 60) } hours ago`;

        } else {
            return `${ Math.floor(since / 60 / 24) } days ago`;
            
        }
    }

    return (
        <Container>
            <div
                className="notifications"
                onClick={ () => setNotificationsOpened(!notificationsOpened) }
                style={ position === 'relative' ? {
                    position: 'relative',
                    top: 0,
                    display: 'block'
                } : {} }
            >
                <img
                    src={ NewNotification }
                    width={ 40 }
                    className={ newNotifications ? "new" : "" }
                    style={{ display: newNotifications ? 'block' : 'none' }}
                />
                
                <img src={ Inbox } width={ 24 } />
            </div>

            {
                notificationsOpened && (
                    <Modal onMouseLeave={ () => setNotificationsOpened(false) } >
                        {
                            notifications.length > 0
                                ? notifications.reverse().map((i, k) => (
                                    <div key={ k } className={ i.new ? "notification-new" : "notification" }>
                                        <img src={ setSource(i.type) } width={ 24 } />

                                        <div className="details">
                                            {
                                                (
                                                    <p>
                                                        {
                                                            i.type === 'download' ? "Downloaded" :
                                                            i.type === 'error' ? 'Failed' : ''
                                                        } <b style={{ fontWeight: 500, color: '#CCC' }}>
                                                            { i.title }
                                                        </b>
                                                    </p>
                                                )
                                            }

                                            <p className="timestamp">{ countTime(i.timestamp) }</p>
                                        </div>
                                    </div>
                                ))
                                : <Empty type="notifications" />
                        }
                    </Modal>
                )
            }
        </Container>
    );
}
