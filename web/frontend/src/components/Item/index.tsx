import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { Container } from './styles';

import { ItemProps } from '../../types';
import { time } from '../../utils/time';

export const Item = ({ thumb, title, author, views, length, id, downloading, queueOpened }: ItemProps) => {

    const handleDownload = () => {
        queueOpened(true);

        downloading(true);

        const { path } = JSON.parse(window.localStorage.getItem('settings')!);

        const queue: Array<{}> = JSON.parse(window.localStorage.getItem('queue')!);

        let pos = 0;

        if (queue === null) {
            window.localStorage.setItem('queue', JSON.stringify([{
                thumb,
                title,
                author,
                views,
                length,
                id,
                pos: 0,
                downloading: true,
                failed: false,
            }]));

        } else {
            pos = queue.length;

            queue.push({
                thumb,
                title,
                author,
                views,
                length,
                id,
                pos: queue.length,
                downloading: true,
                failed: false,
            });

            window.localStorage.setItem('queue', JSON.stringify(queue));
        }

        axios.get(`http://localhost:3001/download?id=${ id }&path=${ path }`)
            .then(() => {
                toast('Downloaded succesfully.', {
                    type: 'success',
                    theme: 'dark',
                });
                
                const queue: Array<{}> = JSON.parse(window.localStorage.getItem('queue')!);

                queue[pos].downloading = false;

                window.localStorage.setItem('queue', JSON.stringify(queue));

                window.dispatchEvent(new Event('storage'));
            })

            .catch(e => {
                toast(e.response.data.error, {
                    type: 'error',
                    theme: 'dark',
                });

                const queue: Array<{}> = JSON.parse(window.localStorage.getItem('queue')!);

                queue[pos].downloading = false;
                queue[pos].failed = true;

                window.localStorage.setItem('queue', JSON.stringify(queue));

                window.dispatchEvent(new Event('storage'));
            })
            
            .finally(() => downloading(false));
    }

    return (
        <Container onClick={ handleDownload }>
            <div
                id="thumbnail"
                style={{
                    backgroundImage: `url(${ thumb })`,
                    width: 256,
                    height: 144,
                    backgroundSize: 'cover'
                }}
            >
                <p className="length">{ isNaN(Number(length)) ? length : time(Number(length)) }</p>
            </div>

            <div id="details">
                <p className="title" title={ title }>{ title.length > 50 ? title.substring(0, 49) + '...' : title }</p>

                <p className="author-views">{ author } · {
                        Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1, }).format(views)
                    } views
                </p>
            </div>
        </Container>
    );
}
