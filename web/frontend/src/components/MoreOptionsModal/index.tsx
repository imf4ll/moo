import { Container } from './styles';

import Settings from '../../assets/settings.svg';

export const MoreOptionsModal = ({ setMoreOptionsOpened, setSettingsModalOpened }: {
    setMoreOptionsOpened: Function;
    setSettingsModalOpened: Function;
}) => {
    return (
        <Container>
            <div onClick={ () => { setSettingsModalOpened(true); setMoreOptionsOpened(false) } }>
                <img src={ Settings } width={ 24 } />

                <p>Settings</p>
            </div>
        </Container>
    );
}
