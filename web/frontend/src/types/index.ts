export interface ItemProps {
    thumb: string;
    title: string;
    author: string;
    views: number;
    length: string;
    id: string;
    downloading: Function;
    queueOpened: Function;
}

export interface HistoryItemProps {
    thumb: string;
    title: string;
    author: string;
    views: number;
    length: string;
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
    path?: string;
    allformats: boolean;
    history?: boolean;
}

export interface Empty {
    image: string;
    text: string;
    width: string;
}
