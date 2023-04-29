import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { ToggleSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css'

import { Header } from '../../components/Header';

import { Container, TextOption, SwitchOption } from './styles';

import { Settings as SettingsProps } from '../../types';

export const Settings = () => {
    const [ settings, setSettings ] = useState<SettingsProps>({});
    const [ allFormatsChecked, setAllFormatsChecked ] = useState<boolean>(false);
    const [ saved, setSaved ] = useState<boolean>(true);

    useEffect(() => {
        if (window.localStorage.getItem('settings') !== null) {
            const settings: SettingsProps = JSON.parse(window.localStorage.getItem('settings')!);

            setSettings(settings);

            if (settings.allformats) {
                setAllFormatsChecked(settings.allformats);

            }
        }

    }, []);

    const handleSave = () => {
        const path = document.querySelector<HTMLInputElement>('#download-path')!;

        if (path.value === '') {
            toast('Path can\'t be empty.', {
                type: 'error',
                theme: 'dark',
            });

            path.focus();

        } else {
            setSettings({
                path: path.value,
                allformats: allFormatsChecked,
            });

            setSaved(true);

            window.localStorage.setItem('settings', JSON.stringify({
                path: path.value,
                allformats: allFormatsChecked,
            }));

            toast('Settings saved.', {
                type: 'success',
                theme: 'dark',
            });
        }
    }

    const handleBack = () => {
        if (window.localStorage.getItem('settings') === null) {
            toast('Settings must be saved.', {
                type: 'error',
                theme: 'dark',
            });


        } else {
            window.location.href = '/';

        }
    }

    const handleSaved = (e: any, name: string) => {
        if (name === "path" && e.target.value === settings.path
            || name === "allformats" && e === settings.allformats)
        {
            setSaved(true);

        } else {
            setSaved(false);

        }
    }

    return (
        <>
            <ToastContainer />

            <Header />

            <Container>
                <h1>Settings</h1>

                <div className="options">
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

                    <SwitchOption>
                        <div>
                            <p className="name">All formats</p>

                            <p className="help">🛈 Enable an option that allow download all formats, instead of just audio.</p>
                        </div>

                        <ToggleSwitch
                            checked={ allFormatsChecked }
                            onChange={ (e) => {
                                setAllFormatsChecked(!allFormatsChecked);

                                handleSaved(e, "allformats");
                            }}
                            onColor="#9361FF"
                            offColor="#1A1A1A"
                        />
                    </SwitchOption>
                </div>

                <input type="button" disabled={ saved } className="save" value="Save" onClick={ handleSave } />

                <input type="button" className="back" value="Back" onClick={ handleBack } />
            </Container>
        </>
    );
}
