export interface ItemProps {
    thumb: string;
    title: string;
    author: string;
    views: string;
    duration: string;
    id: string;
}

export interface QueueItemProps {
    thumb: string;
    title: string;
    author: string;
    views: number;
    length: string;
    downloading: boolean;
    failed: boolean;
}

export interface Settings {
    path: string;
    videoplayer?: boolean;
}

export interface Empty {
    image: string;
    text: string;
    width: string;
}

export interface Video {
    author: string;
    duration: string;
    id: string;
    thumb: string;
    title: string;
    views: string;
}

export interface Playlist {
    id: string;
    thumb: string;
    title: string;
    songs: number;
    videos: Array<Video>;
}

export interface PlaylistSearch {
    id: string;
    songs: number;
    thumb: string;
    title: string;
}

export interface Artist {
    name: string;
    photo: string;
    id: string;
}
