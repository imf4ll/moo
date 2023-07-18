import { Container } from './styles';

export const SwitchOption = ({ children, name, help }: {
    children: JSX.Element | JSX.Element[];
    name: string;
    help: string;
}) => {
    return (
        <Container>
            <div>
                <p className="name">{ name }</p>

                <p className="help">🛈 { help } </p>
            </div>

            { children }
        </Container>
    );
}
