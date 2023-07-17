import axios from 'axios';

import { Container } from './styles';

import { notificate } from '../../../../utils/notifications';

export const Playlist = ({ title, thumb, songs, id, setPlaylistModalOpened, setCurrentPlaylist }: {
    title: string,
    thumb: string,
    songs: number,
    id: string,
    setPlaylistModalOpened: Function,
    setCurrentPlaylist: Function,
}) => {
    const handlePlaylistNotAdded = () => {
        axios.get(`http://localhost:3001/playlist?id=${ id }`)
            .then(({ data }) => {
                setCurrentPlaylist({
                        title,
                        videos: data.videos,
                        id,
                        thumb,
                });

                setPlaylistModalOpened(true);
            })

            .catch(() => notificate('error', 'Failed to set playlist.'));
    }

    return (
        <Container onClick={ () => handlePlaylistNotAdded() } >
            <div className="background" style={{ backgroundImage: `url('${ thumb }')` }}></div>
            
            <p title={ title }>{ title.length > 12 ? title.substring(0, 11) + '...' : title }</p>

            <p className="songs">{ songs } songs</p>
        </Container>
    );
}
