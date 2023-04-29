from inquirer import List, prompt
from pytube import StreamQuery

from utils.reduce import reduce_audios, reduce_videos

def get_video_pos(videos: list):
    video_position = prompt([
        List(
            name = 'position',
            message = 'Choose video title',
            choices = reduce_videos(videos),
            default = 0,
        )
    ])

    return next(iter(video_position.items()))[1]

def get_audio_pos(audios: StreamQuery):
    audio_position = prompt([
        List(
            name = 'position',
            message = 'Choose audio quality',
            choices = reduce_audios(audios),
            default = 0,
        )
    ])

    return next(iter(audio_position.items()))[1]
