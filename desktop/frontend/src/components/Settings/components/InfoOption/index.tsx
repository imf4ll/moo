import { Container } from './styles';

export const InfoOption = ({ children, name, help }: {
    children: JSX.Element | JSX.Element[];
    name: string;
    help: string;
}) => {
    return (
        <Container>
            <div className="title">
                <p className="name">{ name }</p>
                
                <p className="help">🛈 { help }</p>
            </div>

            <div className="child">
                { children } 
            </div>
        </Container>
    );
}
