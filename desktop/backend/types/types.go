package types

type Video struct {
    Title string `json:"title"`
    Author string `json:"author"`
    Views string `json:"views"`
    Duration string `json:"duration"`
    ID string `json:"id"`
    Thumbnail string `json:"thumb"`
}

type PlaylistVideo struct {
    Title string `json:"title"`
    ID string `json:"id"`
    Thumbnail string `json:"thumb"`
    Author string `json:"author"`
    Views string `json:"views"`
    Duration string `json:"duration"`
}

type PlaylistSearch struct {
    ID string `json:"id"`
    Songs int `json:"songs"`
    Thumbnail string `json:"thumb"`
    Title string `json:"title"`
}

type Artist struct {
    Photo string `json:"photo"`
    Name string `json:"name"`
    ID string `json:"id"`
}

type Cache struct {
    ID string `json:"id"`
    Name string `json:"name"`
    Photo string `json:"photo"`
    Playlists []PlaylistSearch `json:"playlists"`
    Videos []Video `json:"videos"`
    Audio string `json:"audio"`
    Timestamp int64 `json:"timestamp"`
}

type LocalSong struct {
    Title string `json:"title"`
    Duration string `json:"duration"`
    Thumb string `json:"thumb"`
    Author string `json:"author"`
    Path string `json:"path"`
}
