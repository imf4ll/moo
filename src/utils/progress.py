from pytube import Stream

def on_progress(stream: Stream, _: bytes, bytes_remaining: int):
    current = stream.filesize - bytes_remaining 

    progress_percent = int(current / stream.filesize * 100)

    progress_bar = int(progress_percent / 2)

    print(f"\r\033[1;32m➥\033[m [\033[1;32m{ '█' * progress_bar }\033[m\033[1;31m{ ' ' * (50 - progress_bar) }\033[m] ({ round(current / 1000000, 1) }MB / { round(stream.filesize / 1000000, 1) }MB)", end = "")
