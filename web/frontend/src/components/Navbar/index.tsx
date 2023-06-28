import { Container } from './styles';

import Logo from '../../../public/icon.png';
import LogoBackground from '../../../public/iconbackground.png';
import Settings from '../../assets/settings.svg';
import Home from '../../assets/home.svg';
import Queue from '../../assets/queue.svg';

export const Navbar = ({ setQueueOpened }: { setQueueOpened: Function }) => {
    return (
        <Container>
            <nav>
                <div className="top">
                    <a href="/">
                        <div className="logo">
                            <img src={ LogoBackground } id="background" width={ 32 } />
                            <img src={ Logo } width={ 32 } />
                        </div>
                    </a>

                    <div className="button">
                        <img src={ Home } width={ 24 } onClick={ () => window.location.href = '/' } />
                    </div>

                    <div className="button">
                        <img src={ Queue } width={ 24 } onClick={ () => setQueueOpened(true) } />
                    </div>
                </div>

                <div className="bottom">
                    <div className="button">
                        <img src={ Settings } width={ 24 } onClick={ () => window.location.href = '/settings' } />
                    </div>
                </div>
            </nav>
        </Container>
    );
}
