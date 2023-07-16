import { useEffect, useState } from 'react';

import { Background, Container } from './styles';

export const VideoPlayer = ({ videoPlayerOpened, videoID }: { videoPlayerOpened: Function, videoID: string }) => {
    const [ size, setSize ] = useState<{ width: string, height: string }>({ width: "640px", height: "360px" });

    useEffect(() => {
        if (window.innerWidth < 800) {
            setSize({
                width: "320px",
                height: "180px",
            });
        }

    }, []);

    return (
        <>
            <Background onClick={ () => videoPlayerOpened(false) } />

            <Container
                style={{
                    width: size.width,
                    height: size.height,
                }}
            >
                <iframe
                    id="ytplayer"
                    itemType="text/html"
                    width={ size.width }
                    height={ size.height }
                    src={`http://www.youtube.com/embed/${ videoID }?autoplay=1&rel=0`}
                    frameBorder="0"
                    allowFullScreen
                />
            </Container>
        </>
    );
}
