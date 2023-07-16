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
