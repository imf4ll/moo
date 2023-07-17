package controllers

import (
    "encoding/json"
    "errors"
    "time"

    "github.com/imf4ll/moo-web/backend/services"
    "github.com/imf4ll/moo-web/backend/utils"

    "github.com/gin-gonic/gin"
)

type CacheAudio struct {
    ID string `json:"id"`
    Audio string `json:"audio"`
    Timestamp int64 `json:"timestamp"`
}

func GetAudioController(ctx *gin.Context) {
    id := ctx.Query("id")

    if id == "" || len(id) != 11 {
        utils.Error(ctx, errors.New("Invalid ID provided."));

        return;
    }

    audio, err := services.GetAudioService(id);
    if err != nil {
        utils.Error(ctx, err);

        return;
    }

    data, _ := json.Marshal(CacheAudio{ID: id, Audio: audio, Timestamp: time.Now().UnixMilli()});

    utils.WriteCache(data, ctx);

    ctx.JSON(200, gin.H {
        "audio": audio,
    });
}
