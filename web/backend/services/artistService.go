package services

import (
    "fmt"
    "io"
    "net/http"
    "strconv"
    "strings"

    "github.com/imf4ll/moo/backend/types"
)

func ArtistService(id string) (types.Artist, []types.PlaylistSearch, error) {
    artist_client := &http.Client{}

    req, err := http.NewRequest("GET", fmt.Sprintf("https://www.youtube.com/channel/%s/releases", id), nil)
    if err != nil {
        return types.Artist{}, []types.PlaylistSearch{}, err;
    
    }

    req.Header.Add("authority", "www.youtube.com");

    res, err := artist_client.Do(req);
    if err != nil {
        return types.Artist{}, []types.PlaylistSearch{}, err;

    }

    defer res.Body.Close();

    data, err := io.ReadAll(res.Body)
    if err != nil {
        return types.Artist{}, []types.PlaylistSearch{}, err;

    }

    artist := types.Artist {
        Name: strings.Split(strings.Split(fmt.Sprintf("%s", data), `<meta property="og:title" content="`)[1], `"`)[0],
        Photo: strings.ReplaceAll(strings.Split(strings.Split(fmt.Sprintf("%s", data), `"thumbnails":[{"url":"`)[1], `"`)[0], "48", "176"),
        ID: id,
    }

    all_playlists := []string{};

    for _, playlist := range strings.Split(fmt.Sprintf("%s", data), `{"playlistRenderer":{`) {
        all_playlists = append(all_playlists, strings.Split(playlist, `{"playlistRenderer":{`)[0]);
    
    }

    playlists := []types.PlaylistSearch{};

    for _, playlist := range all_playlists[1:] {
        id := strings.Split(strings.Split(playlist, `"playlistId":"`)[1], `"`)[0];
        title := strings.Split(strings.Split(playlist, `"title":{"simpleText":"`)[1], `"`)[0];
        songs := strings.Split(strings.Split(playlist, `"videoCount":"`)[1], `"`)[0];
        thumbnail := strings.Split(strings.Split(playlist, `"watchEndpoint":{"videoId":"`)[1], `"`)[0];

        songs_conv, err := strconv.Atoi(songs)
        if err != nil {
            return types.Artist{}, []types.PlaylistSearch{}, err;

        }

       playlists = append(playlists, types.PlaylistSearch {
            ID: id,
            Title: title,
            Songs: songs_conv,
            Thumbnail: fmt.Sprintf("https://i.ytimg.com/vi/%s/hqdefault.jpg", thumbnail),
        });
    }
    
    return artist, playlists, nil;
}
