import { Container } from './styles';

import { copy } from '../../../../utils/copy';

import { duration as durationFormat } from '../../../../utils/time';

export const QueueItem = ({ position, title, thumb, author, duration, id }: {
    position: number,
    title: string,
    thumb: string,
    author: string,
    duration: string,
    id: string,
}) => {

    const handleSetMusic = (e: any) => {
        if (e.detail === 2 && position !== 0) {
            const songQueue = JSON.parse(window.localStorage.getItem('songqueue')!);
            const playerSettings = window.localStorage.getItem('playersettings');

            if (songQueue !== null && songQueue.length > 0) {
                if (playerSettings !== null && JSON.parse(playerSettings!).repeat !== 'no') {
                   window.localStorage.setItem('songqueue', JSON.stringify([
                        ...songQueue.slice(position, songQueue.length),
                        ...songQueue.slice(0, position),
                    ]));
     
                } else {
                    window.localStorage.setItem('songqueue', JSON.stringify([
                        ...songQueue.slice(position, songQueue.length),
                    ]));

                }

                window.dispatchEvent(new Event('newqueue'));
            }
        }
    }

    return (
        <Container id={ position === 0 ? 'first' : '' } onClick={ e => handleSetMusic(e) } onContextMenu={ e => copy(e, id) }>
            <div className="title">
                <div className="thumb">
                    <p>{ position + 1 }</p>

                    <div style={{ backgroundImage: `url('${ thumb }')` }} className="thumbnail" />
                </div>

                <p title={ title }>{ title.length > 80 ? title.replace("\\u0026", "&").substring(0, 79) + '...' : title.replace("\\u0026", "&") } ·
                    <span> { author.replace("\\u0026", "&") }</span>
                </p>
            </div>
            
            <div className="stats">
                <p>{ duration.includes(':') ? duration : durationFormat(Number(duration)) }</p>
            </div>
        </Container>
    );
}
