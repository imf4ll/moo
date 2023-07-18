package services

import (
    "os"
    "fmt"
    "strings"
    "os/exec"
    "strconv"
)

type LocalSong struct {
    Title string `json:"title"`
    Duration string `json:"duration"`
    Thumb string `json:"thumb"`
    Author string `json:"author"`
    Path string `json:"path"`
}

func DownloadsService(path string) ([]LocalSong, error) {
    var songs []LocalSong

    files, err := os.ReadDir(path)
    if err != nil {
        return []LocalSong{}, err;

    }

    for _, f := range files {
        if strings.Contains(f.Name(), ".mp3") {
            filename := strings.Split(f.Name(), ".mp3")[0];
            title := strings.Split(filename, "[.]")[0];
            author := strings.Split(filename, "[.]")[1];

            thumbFileType := "webp";

            _, err := os.ReadFile(fmt.Sprintf("%s/%s.webp", path, filename))
            if err != nil { thumbFileType = "jpg" };

            duration, err := exec.Command("/bin/sh", "-c", fmt.Sprintf(`ffmpeg -i "%s/%s" -f null - 2>&1 | awk '{split($0,a,"time=");print a[3]}' | awk '{split($0,a," ");print a[1]}' | xargs`, path, f.Name())).Output()
            if err != nil { continue };
            
            songs = append(songs, LocalSong {
                Title: title,
                Author: author,
                Thumb: fmt.Sprintf("%s/%s.%s", path, filename, thumbFileType),
                Duration: formatDuration(string(duration)),
                Path: fmt.Sprintf("%s/%s", path, f.Name()),
            });
        }
    }

    return songs, nil
}

func formatDuration(duration string) string {
    if !strings.Contains(duration, ":") { return "0:00" }

    d := strings.Split(strings.Split(duration, ".")[0], ":");
    formatted := "";

    h, _ := strconv.Atoi(d[0]);
    m, _ := strconv.Atoi(d[1]);
    s, _ := strconv.Atoi(d[2]);

    if h > 0 {
        formatted += fmt.Sprintf("%d:0", h);
        
    }

    formatted += fmt.Sprintf("%d:", m);

    if s < 10 {
        formatted += fmt.Sprintf("0");
    
    }

    formatted += fmt.Sprintf("%d", s);

    return formatted;
}
