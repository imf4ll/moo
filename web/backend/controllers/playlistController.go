package controllers;

import (
    "errors"

    "github.com/imf4ll/moo-web/backend/utils"
    "github.com/imf4ll/moo-web/backend/services"

    "github.com/gin-gonic/gin"
)

func PlaylistController(ctx *gin.Context) {
    list := ctx.Query("list")

    if list == "" || len(list) != 34 {
        utils.Error(ctx, errors.New("Invalid playlist ID."));

        return;
    }

    videos, err := services.PlaylistService(list);
    if err != nil {
        utils.Error(ctx, errors.New("Failed to get playlist videos."));

        return;
    }

    ctx.JSON(200, gin.H {
        "videos": videos,
    })
}
