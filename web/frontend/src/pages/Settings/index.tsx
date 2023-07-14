import { useEffect, useState } from 'react';

import { ToggleSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css'

import BackImage from '../../assets/back.svg';

import { Back, Container, TextOption, SwitchOption, ButtonOption } from './styles';

import { Settings as SettingsProps } from '../../types';

import { version as current } from '../../../package.json';
import { checkUpdate } from '../../utils/update';

export const Settings = () => {
    // @ts-ignore
    const [ settings, setSettings ] = useState<SettingsProps>({});
    const [ videoPlayerChecked, setVideoPlayerChecked ] = useState<boolean>(false);
    const [ saved, setSaved ] = useState<boolean>(true);
    const [ queueOpened, setQueueOpened ] = useState<boolean>(false);
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
            // If empty, red

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
            || name === "allformats" && e === settings.allformats
            || name === "videoplayer" && e === settings.videoplayer)
        {
            setSaved(true);

        } else {
            setSaved(false);

        }
    }

    const handleClear = () => {
        const queue = JSON.parse(window.localStorage.getItem('queue')!);

        if (queue.length !== 0) {
            window.localStorage.setItem('queue', JSON.stringify([]));

        }
    }

    return (
        <>
            <Back
                src={ BackImage }
                onClick={ () => history.back() }
                width={ 24 }
            />

            <Container>
                <div className="options">
                    <h3>General</h3>

                    <TextOption>
                        <div>
                            <p className="name">Downloads location:</p>

                            <p className="help">🛈 Path where downloads will be saved. </p>
                        </div>

                        <input
                            type="text"
                            id="download-path"
                            defaultValue={ settings.path }
                            onChange={ (e) => handleSaved(e, "path") }
                        />
                    </TextOption>

                    <ButtonOption>
                        <div>
                            <p className="name">Clear queue</p>

                            <p className="help">🛈 Clear the entire download queue.</p>
                        </div>

                        <input type="button" value="Clear" onClick={ handleClear } />
                    </ButtonOption>

                    <TextOption>
                        <div>
                            <p className="name">Version:</p>
                            
                            <p className="help">🛈 Moo's versioning system.</p>
                        </div>

                        <div className="version">
                            <p>Current: { current }</p>

                            <p>Latest: { latestVersion } {
                                current === latestVersion
                                    ? <span className="uptodate">(Up to date)</span>
                                    : <a className="update" href="https://github.com/imf4ll/moo/blob/master/README.md#updating"><span className="update">(New update available)</span></a>
                                }
                            </p>
                        </div>
                    </TextOption>

                    <h3>Functionalities</h3>

                    <SwitchOption>
                        <div>
                            <p className="name">Video Player</p>

                            <p className="help">🛈 When pressing thumbnail, a video player opens (click on details to download). </p>
                        </div>

                        <ToggleSwitch
                            checked={ videoPlayerChecked }
                            onChange={ (e) => {
                                setVideoPlayerChecked(!videoPlayerChecked);

                                handleSaved(e, "videoplayer");
                            }}
                            onColor="#9361FF"
                            offColor="#1A1A1A"
                        />
                    </SwitchOption>
                </div>

                <input type="button" disabled={ saved } className="save" value="Save" onClick={ handleSave } />
            </Container>
        </>
    );
}
