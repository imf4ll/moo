package services

import (
    "net/http"
    "fmt"
    "io/ioutil"
    "strings"
    "strconv"

    "github.com/imf4ll/moo-web/backend/types"
)

func SearchService(query string, mode string) ([]types.Video, []types.PlaylistSearch, error) {
    client := &http.Client{}

    query = strings.ReplaceAll(query, " ", "+");

    req, err := http.NewRequest("GET", fmt.Sprintf("https://www.youtube.com/results?search_query=%s", query), nil)
    if err != nil {
        return []types.Video{}, []types.PlaylistSearch{}, err;
    
    }

    req.Header.Add("authority", "www.youtube.com");

    res, err := client.Do(req);
    if err != nil {
        return []types.Video{}, []types.PlaylistSearch{}, err;

    }

    defer res.Body.Close();

    data, err := ioutil.ReadAll(res.Body)
    if err != nil {
        return []types.Video{}, []types.PlaylistSearch{}, err;

    }

    all_videos := []string{};

    for _, video := range strings.Split(fmt.Sprintf("%s", data), `"title":{"runs":[`) {
        all_videos = append(all_videos, strings.Split(video, `,"title":{"runs":[`)[0]);
    
    }

    videos := []types.Video{};

    for _, video := range all_videos[1:17] {
        title := strings.Split(strings.Split(video, `{"text":"`)[1], `"}]`)[0];
        author := strings.Split(strings.Split(video, `"ownerText":{"runs":[{"text":"`)[1], `","navigation`)[0];
        views := strings.ReplaceAll(strings.Split(strings.Split(strings.Split(video, `"simpleText":"`)[3], `"`)[0], " ")[0], ".", "");
        length := strings.Split(strings.Split(video, `"simpleText":"`)[2], `"`)[0];
        id := strings.Split(strings.Split(video, `"videoId":"`)[1], `"`)[0];
        thumbnail := fmt.Sprintf("https://i.ytimg.com/vi/%s/hqdefault.jpg", id);

        videos = append(videos, types.Video {
            Title: title,
            Author: author,
            Views: views,
            Length: length,
            ID: id,
            Thumbnail: thumbnail,
        });
    }

    if mode == "player" {
        client := &http.Client{}

        req, err := http.NewRequest("GET", fmt.Sprintf("https://www.youtube.com/results?search_query=%s&sp=EgIQAw==", query), nil)
        if err != nil {
            return []types.Video{}, []types.PlaylistSearch{}, err;
        
        }

        req.Header.Add("authority", "www.youtube.com");

        res, err := client.Do(req);
        if err != nil {
            return []types.Video{}, []types.PlaylistSearch{}, err;

        }

        defer res.Body.Close();

        data, err := ioutil.ReadAll(res.Body)
        if err != nil {
            return []types.Video{}, []types.PlaylistSearch{}, err;

        }

        all_playlists := []string{};

        for _, playlist := range strings.Split(fmt.Sprintf("%s", data), `"playlistRenderer":{`) {
            all_playlists = append(all_playlists, strings.Split(playlist, `}},{"playlistRenderer":{`)[0]);
        
        }

        playlists := []types.PlaylistSearch{};

        for _, playlist := range all_playlists[1:5] {
            id := strings.Split(strings.Split(playlist, `"playlistId":"`)[1], `"`)[0];
            thumbnail := strings.Split(strings.Split(playlist, `"watchEndpoint":{"videoId":"`)[1], `"`)[0];
            songs := strings.Split(strings.Split(playlist, `"videoCount":"`)[1], `"`)[0];
            title := strings.Split(strings.Split(playlist, `"title":{"simpleText":"`)[1], `"`)[0];
            
            songsConv, err := strconv.Atoi(songs)
            if err != nil {
                return []types.Video{}, []types.PlaylistSearch{}, err;
            
            }

            playlists = append(playlists, types.PlaylistSearch {
                ID: id,
                Thumbnail: fmt.Sprintf("https://i.ytimg.com/vi/%s/hqdefault.jpg", thumbnail),
                Songs: songsConv,
                Title: title,
            });
        }

        return videos, playlists, nil;
    }

    return videos, []types.PlaylistSearch{}, nil;
}
