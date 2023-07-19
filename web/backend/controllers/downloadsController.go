package controllers

import (
    "errors"
    
    "github.com/imf4ll/moo/backend/utils"
    "github.com/imf4ll/moo/backend/services"
    
    "github.com/gin-gonic/gin"
)

func DownloadsController(ctx *gin.Context) {
    path := ctx.Query("path");

    if path == "" {
        utils.Error(ctx, errors.New("Failed to get downloads path."));

        return;
    }

    files, err := services.DownloadsService(path)
    if err != nil {
        utils.Error(ctx, errors.New("Failed to get downloads path."));

        return;
    }

    ctx.JSON(200, gin.H {
        "files": files,
    });
}
