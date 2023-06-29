import { useState, useEffect } from 'react';

import { Background, Container } from './styles';

import Download from '../../assets/download.svg';
import UpdateAvailable from '../../assets/updateavailable.svg';
import Error from '../../assets/errornotification.svg';

interface Notification {
    type: String,
    title: String,
    new: boolean,
    timestamp: Number,
}

export const Notifications = ({ notificationsOpened }: { notificationsOpened: Function }) => {
    const [ notifications, setNotifications ] = useState<Array<Notification>>([]);

    useEffect(() => {
        const notifications: Array<Notification> = JSON.parse(window.localStorage.getItem('notifications')!);
    
        if (notifications !== null) {
            setNotifications(notifications);

            setTimeout(() => {
                notifications.map(i => i.new ? i.new = false : { ...i });

                window.localStorage.setItem('notifications', JSON.stringify(notifications));

            }, 2000);
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
        <>
            <Background onClick={ () => notificationsOpened(false) } />

            <Container>
                {
                    notifications.reverse().map((i, k) => (
                        <div key={ k } className={ i.new ? "notification-new" : "notification" }>
                            <img src={ setSource(i.type) } width={ 24 } />

                            <div className="details">
                                {
                                    (
                                        <p>
                                            { i.type === 'download' && "Downloaded" } <b style={{ fontWeight: 500, color: '#CCC' }}>
                                                { i.title }
                                            </b>
                                        </p>
                                    )
                                }

                                <p className="timestamp">{ countTime(i.timestamp) }</p>
                            </div>
                        </div>
                    ))
                }
            </Container>
        </>
    );
}
