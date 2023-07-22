package controllers

import (
    "encoding/json"
    "errors"
    "time"

    "github.com/imf4ll/moo/backend/services"
    "github.com/imf4ll/moo/backend/utils"
    "github.com/imf4ll/moo/backend/types"

    "github.com/gin-gonic/gin"
)

type CachePlaylist struct {
    ID string `json:"id"`
    Videos []types.PlaylistVideo `json:"videos"`
    Timestamp int64 `json:"timestamp"`
}

func PlaylistController(ctx *gin.Context) {
    id := ctx.Query("id")

    if id == "" {
        utils.Error(ctx, errors.New("Invalid playlist ID."));

        return;
    }

    videos, err := services.PlaylistService(id);
    if err != nil {
        utils.Error(ctx, errors.New("Failed to get playlist videos."));

        return;
    }

    data, _ := json.Marshal(CachePlaylist{ID:id, Videos: videos, Timestamp: time.Now().UnixMilli()});

    utils.WriteCache(data, ctx);

    ctx.JSON(200, gin.H {
        "videos": videos,
    })
}
