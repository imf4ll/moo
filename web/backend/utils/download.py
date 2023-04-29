import yt_dlp
from os import getenv
from subprocess import call
from json import dumps, loads

ID = getenv("ID")
FILEPATH = getenv("FILEPATH")

ydl_opts = {
    'format': 'm4a/bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
    }],
}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    url = f'https://www.youtube.com/watch?v={ID}'

    info = loads(dumps(ydl.sanitize_info(ydl.extract_info(url, download = False))))

    ydl.download(f'https://www.youtube.com/watch?v={ID}')

    call(['mv', f'{info["title"]} [{ID}].mp3', f'{FILEPATH}/'])
