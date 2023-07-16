import { useState, useEffect } from 'react';

import { Container } from './styles';

import Back from '../../../../assets/back.svg';
import Play from '../../../../assets/play.svg';

import { Item } from '../Item';

import { Video } from '../../../../types';

export const FavoritesModal = ({ setFavoritesModalOpened, setCurrentAudio, setCurrentStats }: {
    setFavoritesModalOpened: Function,
    setCurrentAudio: Function,
    setCurrentStats: Function,
}) => {
    const [ favorites, setFavorites ] = useState<Array<Video>>([]);

    useEffect(() => {
        const onFavorite = () => {
            const favs = window.localStorage.getItem('favorites');

            if (favs !== null && favs.length > 0) {
                setFavorites(JSON.parse(favs));

            }
        }

        onFavorite();

        window.addEventListener('favoritesUpdated', onFavorite);
    }, []);

    const handlePlaylist = () => {
        if (favorites && favorites.length > 0) {
            let favs = [...favorites];

            if (window.localStorage.getItem('playersettings') !== null) {
                const playerSettings = JSON.parse(window.localStorage.getItem('playersettings')!);

                if (playerSettings.random) {
                    favs = favs
                        .map(i => ({ i, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ i }) => i);
                }
            }

            window.localStorage.setItem('songqueue', JSON.stringify(favs));

            window.dispatchEvent(new Event('newqueue'));
        }
    }

    return (
        <Container>
            <div className="background"></div>
            
            <img id="back" src={ Back } width={ 20 } onClick={ () => setFavoritesModalOpened(false) } />
        
            <div className="content">
                <div className="title-playlist">
                    <div className="title-thumbnail" />

                    <div className="stats">
                        <h1>Favorites</h1>
                    
                        <p>{ favorites ? favorites.length : 0 } songs</p>

                        <div className="buttons">
                            <img src={ Play } width={ 32 } onClick={ () => handlePlaylist() }/>
                        </div>
                    </div>
                </div>

                <div className="items">
                    {
                        favorites && favorites.length > 0
                            ? favorites.map((i, k) => (
                                <Item
                                    title={ i.title }
                                    // @ts-ignore
                                    playlist={{ videos: [ ...favorites ] }}
                                    id={ i.id }
                                    author={ i.author }
                                    duration={ i.duration }
                                    position={ k }
                                    setCurrentAudio={ setCurrentAudio }
                                    setCurrentStats={ setCurrentStats }
                                    thumb={ i.thumb }
                                    views={ i.views }
                                    key={ k }
                                />
                            ))
                            : (
                                <h1>Teste</h1>
                            )
                    }
                </div>
            </div>
        </Container>
    );
}
