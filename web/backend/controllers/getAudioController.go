package controllers

import (
    "errors"

    "github.com/imf4ll/moo-web/backend/utils"
    "github.com/imf4ll/moo-web/backend/services"

    "github.com/gin-gonic/gin"
)

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

    ctx.JSON(200, gin.H {
        "audio": audio,
    });
}
