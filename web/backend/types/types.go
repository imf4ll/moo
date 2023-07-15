package types

type Video struct {
    Title string `json:"title"`
    Author string `json:"author"`
    Views string `json:"views"`
    Duration string `json:"duration"`
    ID string `json:"id"`
    Thumbnail string `json:"thumb"`
}

type Videos struct {
    Videos []Video `json:"videos"`
}

type PlaylistVideo struct {
    Title string `json:"title"`
    ID string `json:"id"`
    Thumbnail string `json:"thumb"`
    Author string `json:"author"`
    Views string `json:"views"`
    Duration string `json:"duration"`
}

type Playlist struct {
    Videos []PlaylistVideo `json:"videos"`
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
