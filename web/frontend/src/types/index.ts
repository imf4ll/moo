export interface ItemProps {
    thumb: string;
    title: string;
    author: string;
    views: number;
    length: string;
    id: string;
    queueOpened: Function;
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
    allformats?: boolean;
    videoplayer?: boolean;
}

export interface Empty {
    image: string;
    text: string;
    width: string;
}
