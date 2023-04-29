import { Container } from './styles';

import { QueueItemProps } from '../../types';

import Downloading from '../../assets/downloading.svg';
import Done from '../../assets/done.svg';
import Failed from '../../assets/error.svg';

export const QueueItem = ({ thumb, title, author, views, length, downloading, failed }: QueueItemProps) => {
    return (
        <Container>
            <div className="information">
                <div className="thumbnail">
                    <img src={ thumb } width={ 128 } height={ 72 } />

                    <p className="length">{ length }</p>
                </div>

                <div className="details">
                    <p className="title" title={ title }>{ title.length > 50 ? title.substring(0, 29) + '...' : title }</p>

                    <p className="author-views">{ author } · {
                            Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1, }).format(views)
                        } views
                    </p>
                </div>
            </div>

            <img
                className="status"
                src={ downloading ? Downloading : failed ? Failed : Done }
                id={ downloading ? 'downloading' : '' }
                width={ 24 }
            />
        </Container>
    );
}
