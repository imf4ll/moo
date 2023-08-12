// +build windows

package services

import (
    "errors"
    "strings"
    "os"
    "io"
    "fmt"
    "net/http"

    "github.com/kkdai/youtube/v2"
)

func DownloadService(url string, path string) (bool, error) {
    client := youtube.Client{};
    
    if strings.Contains(url, "watch?v=") {
        if err := downloadVideo(strings.Split(url, "watch?v=")[1], path); err != nil {
            return false, err;

        }

    } else if strings.Contains(url, "playlist?list=") {
        playlist, err := client.GetPlaylist(strings.Split(url, "playlist?list=")[1])
        if err != nil {
            return false, errors.New("Invalid playlist.");

        }
    
        for _, video := range playlist.Videos {
            if err := downloadVideo(video.ID, path); err != nil {
                fmt.Println("Skipping ", video.ID, " due to a fail.");

                continue
            }
        }
    }

    return true, nil;
}

func downloadVideo(id string, path string) error {
    client := youtube.Client{};
    
    video, err := client.GetVideo(id);
    if err != nil {
        return errors.New("Failed to get video.");

    }

    stream, _, err := client.GetStream(video, video.Formats.FindByItag(140))
    if err != nil {
        return errors.New("Failed to download audio.");

    }

    file, err := os.Create(fmt.Sprintf("%s\\%s[.]%s[.]%s.mp3", path, video.Title, video.Author, id))
    if err != nil {
        return errors.New("Failed to create file.");

    }

    defer file.Close();

    _, err = io.Copy(file, stream)
    if err != nil {
        return errors.New("Failed to download audio.");

    }

    thumbnailFile, err := os.Create(fmt.Sprintf("%s\\%s[.]%s[.]%s.webp", path, video.Title, video.Author, id))
    if err != nil {
        return errors.New("Failed to create thumbnail file.");

    }

    defer thumbnailFile.Close();

    thumbnailReq, err := http.Get(video.Thumbnails[0].URL)
    if err != nil {

    }

    defer thumbnailReq.Body.Close();

    _, err = io.Copy(thumbnailFile, thumbnailReq.Body)
    if err != nil {
        return errors.New("Failed to download thumbnail.");

    }

    return nil
}
