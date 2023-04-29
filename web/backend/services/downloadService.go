package services

import (
    "os"
    "errors"
    "os/exec"
    "fmt"
)

func DownloadService(id string, path string) (bool, error) {
    cmd := exec.Command("python3", "utils/download.py");

    cmd.Env = os.Environ();
    
    cmd.Env = append(cmd.Env, fmt.Sprintf("ID=%s", id));
    cmd.Env = append(cmd.Env, fmt.Sprintf("FILEPATH=%s", path));

    _, err := cmd.Output();
    if err != nil {
        return false, errors.New("Failed to download video.");

    }

    return true, nil;
}
