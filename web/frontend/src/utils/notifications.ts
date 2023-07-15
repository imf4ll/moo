import { toast } from 'react-toastify';

export const notificate = (type: string, title: string) => {
    toast(title, {
        type,
        draggable: true,
        theme: 'dark',
        closeOnClick: true,
        autoClose: 5000,
        position: 'top-right',
    });
}