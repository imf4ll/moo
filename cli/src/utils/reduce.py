from pytube import StreamQuery 

def reduce_videos(videos: list):
    videos_details = []

    for i, video in enumerate(videos):
        videos_details.append((f"{ video['title'] } ({ video['views'] } / { video['length'] })", i))

    return videos_details

def reduce_audios(audios: StreamQuery):
    audios_reduced = []

    for i, audio in enumerate(audios):
        audios_reduced.append((audio.abr, i))

    return audios_reduced
