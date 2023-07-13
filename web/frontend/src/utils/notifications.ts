export const notificate = (type: String, title: String) => {
    const notifications: Array<{}> = JSON.parse(window.localStorage.getItem('notifications')!);
    
    if (notifications === null) {
        window.localStorage.setItem('queue', JSON.stringify([{
            type,
            title: `${ title.length > 35 ? title.substring(0, 34) + '...' : title }`,
            new: true,
            timestamp: Date.now(),
        }]));

    } else {
        notifications.unshift({
            type,
            title: `${ title.length > 35 ? title.substring(0, 34) + '...' : title }`,
            new: true,
            timestamp: Date.now(),
        });

        window.localStorage.setItem('notifications', JSON.stringify(notifications));
    }
}
