package controllers

import (
    "errors"
    "strings"
    
    "github.com/imf4ll/moo/backend/services"
    "github.com/imf4ll/moo/backend/utils"

    "github.com/gin-gonic/gin"
)

func ServeController(ctx *gin.Context) {
    path := ctx.Query("path");

    if path == "" {
        utils.Error(ctx, errors.New("Failed to get file."));

        return;
    
    } else if !strings.Contains(path, ".mp3") && !strings.Contains(path, ".webp") && !strings.Contains(path, ".jpg") {
        utils.Error(ctx, errors.New("Failed to get file."));

        return;
    }

    services.ServeService(ctx, path);
}
