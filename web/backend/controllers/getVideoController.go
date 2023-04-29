package controllers

import (
    "errors"

    "github.com/imf4ll/moo-web/backend/utils"
    "github.com/imf4ll/moo-web/backend/services"

    "github.com/gin-gonic/gin"
)

func GetVideoController(ctx *gin.Context) {
    id := ctx.Query("id")

    if id == "" || len(id) != 11 {
        utils.Error(ctx, errors.New("Invalid URL provided."));

        return;
    }

    video, err := services.GetVideoService(id);
    if err != nil {
        utils.Error(ctx, err);

        return;
    }

    ctx.JSON(200, gin.H {
        "video": video,
    });
}
