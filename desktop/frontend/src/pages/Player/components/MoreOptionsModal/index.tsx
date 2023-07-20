import { useNavigate } from 'react-router-dom';

import { Container } from './styles';

import Settings from '../../../../assets/settings.svg';

export const MoreOptionsModal = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <div onClick={ () => navigate("/settings") }>
                <img src={ Settings } width={ 24 } />

                <p>Settings</p>
            </div>
        </Container>
    );
}
