package services

import (
    "net/http"
    "fmt"
    "io/ioutil"
    "strings"
    "strconv"

    "github.com/imf4ll/moo/backend/types"
)

func SearchService(query string) ([]types.Video, []types.PlaylistSearch, types.Artist, error) {
    query = strings.ReplaceAll(query, " ", "+");

    data, err := request(fmt.Sprintf("https://www.youtube.com/results?search_query=%s", query))
    if err != nil {
        return []types.Video{}, []types.PlaylistSearch{}, types.Artist{}, err;
    
    }

    all_videos := []string{};

    for _, video := range strings.Split(data, `"videoRenderer":{`) {
        all_videos = append(all_videos, strings.Split(video, `},{"videoRenderer":{`)[0]);
    
    }

    videos := []types.Video{};

    for _, video := range all_videos[1:13] {
        if strings.Contains(video, `"iconType":"LIVE"`) { continue }

        title := strings.Split(strings.Split(video, `{"text":"`)[1], `"}]`)[0];
        author := strings.Split(strings.Split(video, `"ownerText":{"runs":[{"text":"`)[1], `","navigation`)[0];
        views := strings.Split(strings.Split(strings.Split(video, `"viewCountText":{"simpleText":"`)[1], `"`)[0], " ")[0];
        duration := strings.Split(strings.Split(video, `}},"simpleText":"`)[3], `"`)[0];
        id := strings.Split(strings.Split(video, `"videoId":"`)[1], `"`)[0];
        thumbnail := fmt.Sprintf("https://i.ytimg.com/vi/%s/hqdefault.jpg", id);

        videos = append(videos, types.Video {
            Title: title,
            Author: author,
            Views: views,
            Duration: duration,
            ID: id,
            Thumbnail: thumbnail,
        });
    }

    data, err = request(fmt.Sprintf("https://www.youtube.com/results?search_query=%s&sp=EgIQAw==", query))
    if err != nil {
        return []types.Video{}, []types.PlaylistSearch{}, types.Artist{}, err;
    
    }

    all_playlists := []string{};

    for _, playlist := range strings.Split(data, `"playlistRenderer":{`) {
        all_playlists = append(all_playlists, strings.Split(playlist, `}},{"playlistRenderer":{`)[0]);
    
    }

    playlists := []types.PlaylistSearch{};

    for _, playlist := range all_playlists[1:5] {
        id := strings.Split(strings.Split(playlist, `"playlistId":"`)[1], `"`)[0];
        thumbnail := strings.Split(strings.Split(playlist, `"watchEndpoint":{"videoId":"`)[1], `"`)[0];
        songs := strings.Split(strings.Split(playlist, `"videoCount":"`)[1], `"`)[0];
        title := strings.Split(strings.Split(playlist, `"title":{"simpleText":"`)[1], `"`)[0];
        
        songs_conv, err := strconv.Atoi(songs)
        if err != nil {
            return []types.Video{}, []types.PlaylistSearch{}, types.Artist{}, err;
        
        }

        playlists = append(playlists, types.PlaylistSearch {
            ID: id,
            Thumbnail: fmt.Sprintf("https://i.ytimg.com/vi/%s/hqdefault.jpg", thumbnail),
            Songs: songs_conv,
            Title: title,
        });
    }

    data, err = request(fmt.Sprintf("https://www.youtube.com/results?search_query=%s&sp=EgIQAg==", query))
    if err != nil {
        return []types.Video{}, []types.PlaylistSearch{}, types.Artist{}, err;
    
    }

    all_channels := []string{};

    for _, channel := range strings.Split(data, `{"channelRenderer":{`) {
        all_channels = append(all_channels, strings.Split(channel, `,{"channelRenderer":{`)[0]);

    }

    artist := types.Artist{}

    for _, c := range all_channels[1:len(all_channels) - 2] {
        if strings.Contains(c, `"OFFICIAL_ARTIST_BADGE"`) {
            artist.ID = strings.Split(strings.Split(c, `"channelId":"`)[1], `"`)[0];
            artist.Photo = strings.ReplaceAll(strings.Split(strings.Split(c, `"thumbnail":{"thumbnails":[{"url":"`)[1], `"`)[0], "88", "176");
            artist.Name = strings.Split(strings.Split(c, `"title":{"simpleText":"`)[1], `"`)[0];

            return videos, playlists, artist, nil;
        }
    }

    return videos, playlists, types.Artist{}, nil;
}

func request(query string) (string, error) {
    client := &http.Client{}

    req, err := http.NewRequest("GET", query, nil)
    if err != nil {
        return "", err;
    
    }

    req.Header.Add("authority", "www.youtube.com");

    res, err := client.Do(req);
    if err != nil {
        return "", err;

    }

    defer res.Body.Close();

    data, err := ioutil.ReadAll(res.Body)
    if err != nil {
        return "", err;

    }

    return fmt.Sprintf("%s", data), nil;
}
