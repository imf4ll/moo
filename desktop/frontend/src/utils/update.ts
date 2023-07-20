import axios from 'axios';

export const checkUpdate = async () => {
    return await axios.get('https://api.github.com/repos/imf4ll/moo/releases/latest')
        .then(r => r.data)
        .then(d => d.name);
}
