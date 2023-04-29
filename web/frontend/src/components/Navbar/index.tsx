import { Container } from './styles';

import Settings from '../../assets/settings.svg';
import Idle from '../../assets/idle.svg';
import Downloading from '../../assets/downloading.svg';
import Queue from '../../assets/queue.svg';

export const Navbar = ({ downloading, queueOpened }: { downloading: boolean, queueOpened: Function }) => {
    return (
        <Container>
            <img src={ Settings } title="Settings" onClick={ () => window.location.href = '/settings' } />

            <img src={ Queue } onClick={ () => queueOpened(true) } />

            <img src={ downloading ? Downloading : Idle } id={ downloading ? "downloading" : "" } title="Status" />
        </Container>
    );
}
