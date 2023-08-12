import { Container } from './styles';

export const TextOption = ({ name, help, defaultValue }: {
    name: string;
    help: string;
    defaultValue: string;
}) => {
    return (
        <Container>
            <div className="title">
                <p className="name">{ name }</p>

                <p className="help">🛈 { help } </p>
            </div>

            <input
                type="text"
                id="download-path"
                defaultValue={ defaultValue }
                onChange={ e => window.dispatchEvent(new CustomEvent('valuechanged', { detail: { value: e.target.value, name: 'path' }})) }
            />
        </Container>
    );
}
