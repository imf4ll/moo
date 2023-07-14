import { Container } from './styles';

import { duration as durationFormat } from '../../../../utils/time';

export const QueueItem = ({ position, title, thumb, author, views, duration }: {
    position: number,
    title: string,
    thumb: string,
    author: string,
    views: string,
    duration: string,
}) => {
    return (
        <Container>
            <div className="title">
                <div className="thumb">
                    <p id={ position === 0 ? 'first' : '' }>{ position + 1 }</p>

                    <div style={{ backgroundImage: `url('${ thumb }')` }} className="thumbnail" />
                </div>

                <p title={ title }>{ title.length > 80 ? title.replace("\\u0026", "&").substring(0, 79) + '...' : title.replace("\\0026", "&") } ·
                    <span> { author }</span>
                </p>
            </div>
            
            <div className="stats">
                {
                    <>
                        <p>{ views }</p>

                        <p>{ duration.includes(':') ? duration : durationFormat(Number(duration)) }</p>
                    </>
                }
            </div>
        </Container>
    );
}
