import { notificate } from './notifications';

export const copy = (e: any, id: string) => {
    if (id !== '') {
        e.preventDefault();

        // @ts-ignore
        navigator.permissions.query({ name: 'clipboard-write' }).then(r => {
            if (r.state === 'granted' || r.state === 'prompt') {
                navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${ id }`);

                notificate('success', 'Copied to clipboard.');
            }
        });    
    }
}
