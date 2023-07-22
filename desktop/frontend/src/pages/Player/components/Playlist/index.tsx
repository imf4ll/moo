import { Container } from './styles';

import { notificate } from '../../../../utils/notifications';
import { api } from '../../../../utils/api';

export const Playlist = ({ title, thumb, songs, id, setPlaylistModalOpened, setCurrentPlaylist }: {
    title: string,
    thumb: string,
    songs: number,
    id: string,
    setPlaylistModalOpened: Function,
    setCurrentPlaylist: Function,
}) => {
    const handlePlaylistNotAdded = () => {
        api.get(`/playlist?id=${ id }`)
            .then(({ data }) => {
                setCurrentPlaylist({
                    title,
                    videos: data.videos,
                    id,
                    thumb,
                });

                setPlaylistModalOpened(true);
            })

            .catch(() => notificate('error', 'Failed to set playlist, maybe it\'s private, invalid or was deleted.'));
    }

    return (
        <Container onClick={ () => handlePlaylistNotAdded() } >
            <div className="background" style={{ backgroundImage: `url('${ thumb }')` }}></div>
            
            <p title={ title }>{ title.length > 12 ? title.substring(0, 11) + '...' : title }</p>

            <p className="songs">{ songs } songs</p>
        </Container>
    );
}
