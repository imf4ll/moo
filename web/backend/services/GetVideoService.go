package services

import (
    "github.com/imf4ll/moo-web/backend/types"
    "github.com/imf4ll/moo-web/backend/utils"
)

func GetVideoService(id string) (types.Video, error) {
    video, err := utils.GetVideo(id);
    if err != nil {
        return types.Video{}, err;

    }

    return video, nil;
}
