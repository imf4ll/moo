import { Container } from './styles';

import { HistoryItemProps } from '../../types';

export const HistoryItem = ({ thumb, title, author, views, length }: HistoryItemProps) => {
    return (
        <Container>
            <div
                id="thumbnail"
                style={{
                    backgroundImage: `url(${ thumb })`,
                    width: 256,
                    height: 144,
                }}
            >
                <p className="length">{ length }</p>
            </div>

            <div id="details">
                <p className="title" title={ title }>{ title.length > 50 ? title.substring(0, 49) + '...' : title }</p>

                <p className="author-views">{ author } · {
                        Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1, }).format(views)
                    } views
                </p>
            </div>
        </Container>
    );
}
