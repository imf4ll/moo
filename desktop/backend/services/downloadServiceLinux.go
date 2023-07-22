// +build linux darwin

package services

import (
    "errors"
    "fmt"
    "os/exec"
    "strings"
)

func DownloadService(url string, path string) (bool, error) {
    command := strings.Split (
        fmt.Sprintf(`yt-dlp -x --audio-format mp3 -f 140 -o %%(title)s[.]%%(uploader)s.%%(ext)s --write-thumbnail -o thumbnail:%%(title)s[.]%%(uploader)s.%%(ext)s %s`, url),
        " ",
    );

    if strings.Contains(url, "watch?v=") {
        command = strings.Split (
            fmt.Sprintf(`yt-dlp -x --audio-format mp3 -f 140 -o %%(title)s[.]%%(uploader)s[.]%%(id)s.%%(ext)s --write-thumbnail -o thumbnail:%%(title)s[.]%%(uploader)s[.]%%(id)s.%%(ext)s %s`, url),
            " ",
        );
    }

    err := exec.Command(command[0], command[1:]...).Run();
    if err != nil {
        return false, errors.New("Failed to download video.");

    }

    if strings.Contains(url, "watch?v=") {
        id := strings.Split(url, "watch?v=")[1];

        err = exec.Command("/bin/sh", "-c", fmt.Sprintf("mv *%s.mp3 *%s.webp *%s.jpg %s/", id, id, id, path)).Run()
        if err != nil && strings.Contains(err.Error(), "exit status 2") {
            return false, errors.New("Failed to download video.");

        }
    
    } else {
        err = exec.Command("/bin/sh", "-c", fmt.Sprintf("mv *.mp3 *.webp *.jpg %s/", path)).Run()
        if err != nil && strings.Contains(err.Error(), "exit status 2") {
            return false, errors.New("Failed to download playlist.");

        }
    }

    return true, nil;
}
