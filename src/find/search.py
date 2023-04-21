from requests import get
from pytube import YouTube

from utils.position import get_audio_pos, get_video_pos
from utils.progress import on_progress

def search(query: str, filename: str, path: str, max_search: int):
    data = get(f'https://www.youtube.com/results?search_query={ query }', headers = { "authority": "www.youtube.com" }, timeout = 30)

    all_videos = []

    for i in data.text.split('"title":{"runs":['):
        all_videos.append(i.split(',"params"')[0])

    all_videos.pop(0)

    videos = []

    for video in all_videos[0:max_search]:
        try:
            title = video.split('{"text":"')[1].split('"}],"accessibility"')[0]
            length = video.split('simpleText":"')[2].split('"')[0]
            views = video.split('simpleText":"')[3].split('"')[0]
            video_id = video.split('"videoId":"')[1].split('"')[0]

            videos.append({
                'id': video_id,
                'title': title,
                'views': views,
                'length': length,
            })

        except:
            continue

    video_position = get_video_pos(videos)

    video_req = YouTube('https://www.youtube.com/watch?v=' + videos[video_position]['id'], on_progress_callback = on_progress)

    audios = video_req.streams.filter(only_audio = True, file_extension = 'mp4')

    audios[get_audio_pos(audios)].download(
        filename = filename if filename else videos[video_position]['title'] + '.mp3',
        output_path = path if path else './',
    )
