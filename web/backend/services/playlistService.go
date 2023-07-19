package services

import (
    "net/http"
    "fmt"
    "io/ioutil"
    "strings"

    "github.com/imf4ll/moo/backend/types"
)

func PlaylistService(id string) ([]types.PlaylistVideo, error) {
    client := &http.Client{}

    req, err := http.NewRequest("GET", fmt.Sprintf("https://www.youtube.com/playlist?list=%s", id), nil)
    if err != nil {
        return []types.PlaylistVideo{}, err;
    
    }

    req.Header.Add("authority", "www.youtube.com");

    res, err := client.Do(req);
    if err != nil {
        return []types.PlaylistVideo{}, err;

    }

    defer res.Body.Close();

    data, err := ioutil.ReadAll(res.Body)
    if err != nil {
        return []types.PlaylistVideo{}, err;

    }

    all_videos := []string{};

    for _, video := range strings.Split(fmt.Sprintf("%s", data), `"title":{"runs":[`) {
        all_videos = append(all_videos, strings.Split(video, `,"title":{"runs":[`)[0])
    
    }

    videos := []types.PlaylistVideo{};

    for _, video := range all_videos[1:len(all_videos) - 6] {
        if !strings.Contains(video, `"videoId"`) { continue };

        title := strings.Split(strings.Split(video, `{"text":"`)[1], `"}]`)[0];
        id := strings.Split(strings.Split(video, `"videoId":"`)[1], `"`)[0];
        thumbnail := fmt.Sprintf("https://i.ytimg.com/vi/%s/hqdefault.jpg", id);
        author := strings.Split(strings.Split(video, `"shortBylineText":{"runs":[{"text":"`)[1], `","navigation`)[0];
        views := strings.Split(strings.Split(strings.Split(video, `accessibilityData":{"label":"`)[1], `"`)[0], " ");
        duration := strings.Split(strings.Split(video, `"simpleText":"`)[2], `"`)[0];

        videos = append(videos, types.PlaylistVideo {
            Title: title,
            ID: id,
            Thumbnail: thumbnail,
            Author: author,
            Views: views[len(views) - 2],
            Duration: duration,
        });
    }
    
    return videos, nil;
}
