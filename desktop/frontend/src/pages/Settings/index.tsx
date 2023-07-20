import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'react-dragswitch/dist/index.css'

import { Back, Container } from './styles';

import { TextOption } from './components/TextOption';
import { InfoOption } from './components/InfoOption';
import { ButtonOption } from './components/ButtonOption';

import { Settings as SettingsProps } from '../../types';

import { version as current } from '../../../package.json';
import { checkUpdate } from '../../utils/update';
import { notificate } from '../../utils/notifications';

export const Settings = () => {
    const [ settings, setSettings ] = useState<SettingsProps>({ path: '', videoplayer: false });
    const [ saved, setSaved ] = useState<boolean>(true);
    const [ latestVersion, setLatestVersion ] = useState<String>();
    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem('settings') !== null) {
            const settings: SettingsProps = JSON.parse(window.localStorage.getItem('settings')!);

            setSettings(settings);
        }

        (async () => setLatestVersion(await checkUpdate()))();

    }, []);

    useEffect(() => {
        window.addEventListener('valuechanged', ({ detail }: any) => {
            if (detail.name === "path" && detail.value === settings.path) {
                setSaved(true);

            } else {
                setSaved(false);

            }
        });

    }, [ settings ]);

    const handleSave = () => {
        const path = document.querySelector<HTMLInputElement>('#download-path')!;

        if (path.value === '') {
            path.focus();

        } else {
            setSettings({
                path: path.value,
            });

            setSaved(true);

            window.localStorage.setItem('settings', JSON.stringify({
                path: path.value,
            }));
        }
    }

    const handleCopy = async () => {
        try {
            // @ts-ignore
            window.runtime.ClipboardSetText(JSON.stringify(window.localStorage))
                .then(() => notificate('success', 'Copied to clipboard.'))
                .catch(() => notificate('error', 'Failed to copy to clipboard.'));
        
        } catch {
            // @ts-ignore
            navigator.permissions.query({ name: 'clipboard-write' }).then(r => {
                if (r.state === 'granted' || r.state === 'prompt') {
                    navigator.clipboard.writeText(JSON.stringify(window.localStorage));

                    notificate('success', 'Copied to clipboard.');
                }
            });
        }
    }

    const handlePaste = () => {
        const paste = (r: string) => {
            const clipboard: Object = JSON.parse(r);

            window.localStorage.clear();

            Object.entries(clipboard).forEach(([k, v]) => window.localStorage.setItem(k, v));

            notificate('success', 'Storage set successfully');

        }

        try {
            // @ts-ignore
            window.runtime.ClipboardGetText()
                .then((r: string) => paste(r))
                
                .catch(() => notificate('error', 'Failed to paste from clipboard.'));

        } catch {
            // @ts-ignore
            navigator.permissions.query({ name: 'clipboard-read' }).then(r => {
                if (r.state === 'granted' || r.state === 'prompt') {
                    navigator.clipboard.readText()
                        .then(r => paste(r))
                        
                        .catch(() => notificate('error', 'Failed to paste from clipboard.'));
                }
            });    
        }
    }

    const handleClear = () => {
        if (window.localStorage.getItem('searchhistory') !== null) {
            window.localStorage.setItem('searchhistory', '[]');

            notificate('success', 'Search history cleared.');
        }
    }

    return (
        <>
            <Back type="button" style={{ color: 'white' }} value="Back" onClick={
                () => navigate("/")
            } />

            <Container>
                <div className="options">
                    <h3>General</h3>

                    <TextOption
                        name="Downloads location:"
                        help="Path where downloads will be saved."
                        defaultValue={ settings.path }
                    />

                    <InfoOption name="Version:" help="Moo's versioning system.">
                        <p>Current: { current }</p>

                        <p>Latest: { latestVersion } {
                            current === latestVersion
                                ? <span className="uptodate">(Up to date)</span>
                                : <a className="update" href="https://github.com/imf4ll/moo/blob/master/README.md#updating"><span className="update">(New update available)</span></a>
                            }
                        </p>
                    </InfoOption>

                    <ButtonOption name="Storage" help="Set or copy all local storage settings (includes all data)">
                        <input type="button" value="Copy" style={{ color: "#AC6AFF" }} onClick={ () => handleCopy() } />
                        <input type="button" value="Paste" style={{ color: "#AC6AFF" }} onClick={ () => handlePaste() } />
                    </ButtonOption>

                    <ButtonOption name="Search history" help="Clear search history (only 10 lasts searchs are storaged)">
                        <input type="button" value="Clear" style={{ color: '#FF5C5C' }} onClick={ () => handleClear() } />
                    </ButtonOption>
                </div>

                <input type="button" disabled={ saved } className="save" value="Save" onClick={ handleSave } />
            </Container>
        </>
    );
}
