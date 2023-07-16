import { Container } from './styles';

import Settings from '../../../../assets/settings.svg';

export const MoreOptionsModal = () => {
    return (
        <Container>
            <a href="/settings">
                <div>
                    <img src={ Settings } width={ 24 } />

                    <p>Settings</p>
                </div>
            </a>
        </Container>
    );
}
