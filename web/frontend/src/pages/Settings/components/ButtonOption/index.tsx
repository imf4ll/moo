import { Container } from './styles';

export const ButtonOption = ({ name, help, handle }: {
    name: string;
    help: string;
    handle: Function
}) => {
    return (
        <Container>
            <div>
                <p className="name">{ name }</p>

                <p className="help">🛈 { help }</p>            
            </div>
                
            <input type="button" value="Clear" onClick={ () => handle() } />
        </Container>
    );
}
