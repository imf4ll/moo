import { Container } from './styles';

import Settings from '../../../../assets/settings.svg';
import Download from '../../../../assets/download.svg';

export const MoreOptionsModal = () => {
    return (
        <Container>
            <a href="/download">
                <div>
                    <img src={ Download } width={ 24 } />

                    <p>Downloader</p>
                </div>
            </a>

            <a href="/settings">
                <div>
                    <img src={ Settings } width={ 24 } />

                    <p>Settings</p>
                </div>
            </a>
        </Container>
    );
}
