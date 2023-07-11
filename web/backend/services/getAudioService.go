package services

import (
    "errors"

    "github.com/kkdai/youtube/v2"
)

func GetAudioService(id string) (string, error) {
    client := youtube.Client{};

    video, err := client.GetVideo(id);
    if err != nil {
        return "", errors.New("Failed to get video.");

    }

    audio, err := client.GetStreamURL(video, video.Formats.FindByItag(140));

    return audio, nil;
}
