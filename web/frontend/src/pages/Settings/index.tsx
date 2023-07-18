import { useEffect, useState } from 'react';

import { ToggleSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css'

import BackImage from '../../assets/back.svg';

import { Back, Container } from './styles';

import { TextOption } from './components/TextOption';
import { InfoOption } from './components/InfoOption';
import { SwitchOption } from './components/SwitchOption';

import { Settings as SettingsProps } from '../../types';

import { version as current } from '../../../package.json';
import { checkUpdate } from '../../utils/update';

export const Settings = () => {
    const [ settings, setSettings ] = useState<SettingsProps>({ path: '', videoplayer: false });
    const [ videoPlayerChecked, setVideoPlayerChecked ] = useState<boolean>(false);
    const [ saved, setSaved ] = useState<boolean>(true);
    const [ latestVersion, setLatestVersion ] = useState<String>();

    useEffect(() => {
        if (window.localStorage.getItem('settings') !== null) {
            const settings: SettingsProps = JSON.parse(window.localStorage.getItem('settings')!);

            setSettings(settings);

            if (settings.videoplayer) {
                setVideoPlayerChecked(settings.videoplayer);

            }
        }

        (async () => setLatestVersion(await checkUpdate()))();

    }, []);

    const handleSave = () => {
        const path = document.querySelector<HTMLInputElement>('#download-path')!;

        if (path.value === '') {
            path.focus();

        } else {
            setSettings({
                path: path.value,
                videoplayer: videoPlayerChecked,
            });

            setSaved(true);

            window.localStorage.setItem('settings', JSON.stringify({
                path: path.value,
                videoplayer: videoPlayerChecked,
            }));
        }
    }

    const handleSaved = (e: any, name: string) => {
        if (name === "path" && e.target.value === settings.path
            || name === "videoplayer" && e === settings.videoplayer)
        {
            setSaved(true);

        } else {
            setSaved(false);

        }
    }

    return (
        <>
            <Back
                src={ BackImage }
                onClick={ () => window.location.href = '/' }
                width={ 24 }
            />

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

                    <h3>Functionalities</h3>

                    <SwitchOption name="Video Player" help="When pressing thumbnail, a video player opens (click on details to download).">
                        <ToggleSwitch
                            checked={ videoPlayerChecked }
                            onChange={ e => {
                                setVideoPlayerChecked(!videoPlayerChecked);

                                handleSaved(e, "videoplayer");
                            }}
                            onColor="#ac6aff"
                            offColor="#1A1A1A"
                            disabled
                        />
                    </SwitchOption>
                </div>

                <input type="button" disabled={ saved } className="save" value="Save" onClick={ handleSave } />
            </Container>
        </>
    );
}
