import axios from 'axios';
import { useState, useEffect } from 'react';

import { Container } from './styles';

import { VideoPlayer } from '../../components/VideoPlayer';

import { ItemProps } from '../../types';
import { time } from '../../utils/time';
import { notificate } from '../../utils/notifications';

export const Item = ({ thumb, title, author, views, length, id, queueOpened }: ItemProps) => {
    const [ videoPlayerEnabled, setVideoPlayerEnabled ] = useState<boolean>(false);
    const [ videoPlayerOpened, setVideoPlayerOpened ] = useState<boolean>(false);

    useEffect(() => {
        const { videoplayer } = JSON.parse(window.localStorage.getItem('settings')!);

        if (videoplayer) {
            setVideoPlayerEnabled(videoplayer);

        }

    }, []);

    const handleDownload = () => {
        queueOpened(true);

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
                notificate('download', title);
                
                const queue: Array<{}> = JSON.parse(window.localStorage.getItem('queue')!);

                // @ts-ignore
                queue[pos].downloading = false;

                window.localStorage.setItem('queue', JSON.stringify(queue));

                window.dispatchEvent(new Event('storage'));
            })

            .catch(e => {
                notificate('error', title);
                
                const queue: Array<{}> = JSON.parse(window.localStorage.getItem('queue')!);

                // @ts-ignore
                queue[pos].downloading = false;
                // @ts-ignore
                queue[pos].failed = true;

                window.localStorage.setItem('queue', JSON.stringify(queue));

                window.dispatchEvent(new Event('storage'));
            });
    }

    return (
        <>
            {
                videoPlayerEnabled && videoPlayerOpened &&
                    <VideoPlayer videoPlayerOpened={ setVideoPlayerOpened } videoID={ id } />
            }

            <Container>
                <div
                    id="thumbnail"
                    style={{
                        backgroundImage: `url(${ thumb })`,
                        width: 256,
                        height: 144,
                        backgroundSize: 'cover'
                    }}
                    title={ videoPlayerEnabled ? "Watch video" : "Download" }
                    onClick={ videoPlayerEnabled ? () => setVideoPlayerOpened(true) : handleDownload }
                >
                    <p className="length">{ isNaN(Number(length)) ? length : time(Number(length)) }</p>
                </div>

                <div
                    id="details"
                    onClick={ videoPlayerEnabled ? handleDownload : undefined }
                    title="Download"
                >
                    <p className="title" title={ title }>{ title.length > 50 ? title.substring(0, 49) + '...' : title }</p>

                    <p className="author-views">{ author } · {
                            Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1, }).format(views)
                        } views
                    </p>
                </div>
            </Container>
        </>
    );
}
