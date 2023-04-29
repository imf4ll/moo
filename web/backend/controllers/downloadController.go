package controllers

import (
    "errors"

    "github.com/imf4ll/moo-web/backend/services"
    "github.com/imf4ll/moo-web/backend/utils"

    "github.com/gin-gonic/gin"
)

func DownloadController(ctx *gin.Context) {
    id := ctx.Query("id");
    path := ctx.Query("path");

    if id == "" || len(id) != 11 ||  path == "" {
        utils.Error(ctx, errors.New("Invalid ID or path provided."));

        return;
    }

    downloaded, err := services.DownloadService(id, path);
    if err != nil {
        utils.Error(ctx, err);

        return;
    }

    ctx.JSON(200, gin.H {
        "success": downloaded,
    });
}
