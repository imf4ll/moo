package types

type Video struct {
    Title string `json:"title"`
    Author string `json:"author"`
    Views string `json:"views"`
    Length string `json:"length"`
    ID string `json:"id"`
    Thumbnail string `json:"thumb"`
}

type Videos struct {
    Videos []Video `json:"videos"`
}
