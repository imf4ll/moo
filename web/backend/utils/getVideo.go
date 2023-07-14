package utils

import (
    "errors"
    "fmt"

    "github.com/imf4ll/moo-web/backend/types"

    "github.com/kkdai/youtube/v2"
)

func GetVideo(id string) (types.Video, error) {
    var video types.Video;

    client := youtube.Client{};

    info, err := client.GetVideo(id);
    if err != nil {
        return video, errors.New("Failed to get video.");

    }

    video = types.Video {
        Title: info.Title,
        Author: info.Author,
        Views: fmt.Sprintf("%d", info.Views),
        Duration: fmt.Sprintf("%.0f", info.Duration.Seconds()),
        ID: id,
        Thumbnail: info.Thumbnails[len(info.Thumbnails) - 1].URL,
    }

    return video, nil
}
