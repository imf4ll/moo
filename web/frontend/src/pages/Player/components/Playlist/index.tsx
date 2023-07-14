import axios from 'axios';

import { Container } from './styles';

import { notificate } from '../../../../utils/notifications';

import Add from '../../../../assets/add.svg';
import Success from '../../../../assets/success.svg';
import Play from '../../../../assets/play.svg';

export const Playlist = ({ title, thumb, songs, id }: {
    title: string,
    thumb: string,
    songs: number,
    id: string
}) => {
    const handleAddPlaylist = () => {
        axios.get(`http://localhost:3001/addPlaylist?list=${ id }`)
            .then(r => {
                if (window.localStorage.getItem('playlists') !== null) {
                    const playlists = JSON.parse(window.localStorage.getItem('playlists')!);

                    playlists.unshift({
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
                notificate('error', 'Failed to add playlist, try again.');

            });
    }
    
    const handlePlaylist = () => {
        axios.get(`http://localhost:3001/addPlaylist?list=${ id }`)
            .then(({ data }) => {
                if (window.localStorage.getItem('playersettings') !== null) {
                    const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

                    if (playerSettings.random) {
                        data.videos = data.videos
                            .map(i => ({ i, sort: Math.random() }))
                            .sort((a, b) => a.sort - b.sort)
                            .map(({ i }) => i);
                    }
                }

                window.localStorage.setItem('songqueue', JSON.stringify(data.videos));

                window.dispatchEvent(new Event('newqueue'));
            })

            .catch(() => notificate('error', 'Failed to play list.'));
    }

    return (
        <Container>
            <div className="background" style={{ backgroundImage: `url('${ thumb }')` }}></div>
            
            <p title={ title }>{ title.length > 16 ? title.substring(0, 15) + '...' : title }</p>

            <p className="songs">{ songs } songs</p>

            <div className="buttons">
                <img src={ Play } width={ 42 } onClick={ () => handlePlaylist() } />

                <img src={ Add } width={ 42 } id={ `add-${ id }` } onClick={ () => handleAddPlaylist() } />
            </div>
        </Container>
    );
}
