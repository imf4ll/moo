package services

import (
	"errors"
	"net/http"

	"github.com/kkdai/youtube/v2"
)

func GetAudioService(id string) (string, error) {
    client := youtube.Client{};

    video, err := client.GetVideo(id);
    if err != nil {
        return "", errors.New("Failed to get video.");

    }

    for {
        audio, err := client.GetStreamURL(video, &video.Formats.Itag(140)[0]);
        if err != nil { continue }

        data, _ := http.Get(audio);
        if data.StatusCode == 200 { 
            return audio, nil;

        }
    }
}
