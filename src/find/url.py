from pytube import YouTube

from utils.position import get_audio_pos
from utils.progress import on_progress

def byurl(url: str, filename: str, path: str, first: bool):
    video = YouTube(url, on_progress_callback = on_progress)

    print(f"Downloading \033[1;34m{ video.title }\033[m\n")

    audios = video.streams.filter(only_audio = True, file_extension = 'mp4')

    audios[1 if first else get_audio_pos(audios)].download(
        filename = filename if filename else video.title + '.mp3',
        output_path = path if path else './',
    )
