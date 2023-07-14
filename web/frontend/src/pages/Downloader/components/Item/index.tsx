import axios from 'axios';
import { useState, useEffect } from 'react';

import { Container } from './styles';

import { VideoPlayer } from '../../components/VideoPlayer';

import { ItemProps } from '../../../../types';
import { time } from '../../../../utils/time';
import { notificate } from '../../../../utils/notifications';

export const Item = ({ thumb, title, author, views, duration, id }: ItemProps) => {
    const [ videoPlayerEnabled, setVideoPlayerEnabled ] = useState<boolean>(false);
    const [ videoPlayerOpened, setVideoPlayerOpened ] = useState<boolean>(false);

    useEffect(() => {
        const { videoplayer } = JSON.parse(window.localStorage.getItem('settings')!);

        if (videoplayer) {
            setVideoPlayerEnabled(videoplayer);

        }

    }, []);

    const handleDownload = () => {
        const { path } = JSON.parse(window.localStorage.getItem('settings')!);
 
        axios.get(`http://localhost:3001/download?id=${ id }&path=${ path }`)
            .then(() => {
                notificate('success', `Downloaded ${ title.substring(0, 15) + '...' }`);

            })

            .catch(() => {
                notificate('error', `Failed to download ${ title.substring(0, 15) + '...' }`);

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
