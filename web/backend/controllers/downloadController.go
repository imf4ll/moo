package controllers

import (
    "errors"

    "github.com/imf4ll/moo-web/backend/services"
    "github.com/imf4ll/moo-web/backend/utils"

    "github.com/gin-gonic/gin"
)

func DownloadController(ctx *gin.Context) {
    url := ctx.Query("url");
    path := ctx.Query("path");

    if url == "" || path == "" {
        utils.Error(ctx, errors.New("Invalid ID or path provided."));

        return;
    }

    downloaded, err := services.DownloadService(url, path);
    if err != nil {
        utils.Error(ctx, err);

        return;
    }

    ctx.JSON(200, gin.H {
        "success": downloaded,
    });
}
