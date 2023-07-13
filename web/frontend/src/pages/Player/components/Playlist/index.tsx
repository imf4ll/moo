import axios from 'axios';

import { Container } from './styles';

import { notificate } from '../../../../utils/notifications';

import Add from '../../../../assets/add.svg';
import Success from '../../../../assets/success.svg';

export const Playlist = ({ title, thumb, songs, id }: { title: string, thumb: string, songs: number, id: string }) => {
    const handleAddPlaylist = () => {
        axios.get(`http://localhost:3001/addPlaylist?list=${ id }`)
            .then(r => {
                if (window.localStorage.getItem('playlists') !== null) {
                    const playlists = JSON.parse(window.localStorage.getItem('playlists')!);

                    playlists.push({
                        videos: r.data.videos,
                        title,
                        thumb,
                    });

                    window.localStorage.setItem('playlists', JSON.stringify(playlists));

                } else {
                    window.localStorage.setItem('playlists', JSON.stringify([{
                        videos: r.data.videos,
                        title,
                        thumb,
                    }]));
                }
        
                window.dispatchEvent(new Event('playlistsaved'));

                document.querySelector<HTMLImageElement>(`#add-${ id }`)!.src = Success;
            })

            .catch(() => {
                notificate('error', 'to get playlist.');

                window.dispatchEvent(new Event('newnotification'));
            });
    }

    return (
        <Container onClick={ () => handleAddPlaylist() }>
            <div className="background" style={{ backgroundImage: `url('${ thumb }')` }}></div>
            
            <p title={ title }>{ title.length > 16 ? title.substring(0, 15) + '...' : title }</p>

            <p className="songs">{ songs } songs</p>

            <img src={ Add } width={ 36 } id={ `add-${ id }` } />
        </Container>
    );
}
