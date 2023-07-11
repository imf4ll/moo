package controllers

import (
    "strings"

    "github.com/imf4ll/moo-web/backend/services"
    "github.com/imf4ll/moo-web/backend/utils"

    "github.com/gin-gonic/gin"
)

func PlaylistController(ctx *gin.Context) {
    ids := ctx.Query("ids");
    path := ctx.Query("path");

    ids_arr := strings.Split(ids, ",");

    for _, id := range ids_arr {
        _, err := services.DownloadService(id, path);
        if err != nil {
            utils.Error(ctx, err);

            continue;
        }
    }

    ctx.JSON(200, gin.H {
        "success": "Playlist succesfully downloaded.",
    });
}
