import { Background, Container } from './styles';

export const VideoPlayer = ({ videoPlayerOpened, videoID }: { videoPlayerOpened: Function, videoID: string }) => {
    return (
        <>
            <Background onClick={ () => videoPlayerOpened(false) } />

            <Container>
                <iframe
                    id="ytplayer"
                    itemType="text/html"
                    width="320"
                    height="180"
                    src={`http://www.youtube.com/embed/${ videoID }?autoplay=1&rel=0`}
                    frameBorder="0"
                    allowFullScreen
                />
            </Container>
        </>
    );
}
