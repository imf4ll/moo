import { Container } from './styles';

import Logo from '../../../public/icon.png';
import LogoBackground from '../../../public/iconbackground.png';
import Settings from '../../assets/settings.svg';
import Queue from '../../assets/downloading.svg';
import Player from '../../assets/library.svg';
import Download from '../../assets/download.svg';

export const Navbar = ({ setQueueOpened }: { setQueueOpened: Function }) => {
    const handleClick = (location: string) => {
        window.location.href = location;

    }

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
                        <img src={ Player } width={ 24 } onClick={ () => handleClick('/') } />
                    </div>

                    <div className="button">
                        <img src={ Download } width={ 24 } onClick={ () => handleClick('/download') } />
                    </div>
                </div>

                <div className="bottom">
                    <div className="button">
                        <img src={ Queue } width={ 24 } onClick={ () => setQueueOpened(true) } />
                    </div>

                    <div className="button">
                        <img src={ Settings } width={ 24 } onClick={ () => window.location.href = '/settings' } />
                    </div>
                </div>
            </nav>
        </Container>
    );
}
