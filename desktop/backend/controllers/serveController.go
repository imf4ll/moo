package controllers

import (
    "errors"
    
    "github.com/imf4ll/moo/backend/services"
    "github.com/imf4ll/moo/backend/utils"

    "github.com/gin-gonic/gin"
)

func ServeController(ctx *gin.Context) {
    path := ctx.Query("path");

    if path == "" {
        utils.Error(ctx, errors.New("Failed to get file."));

        return;
    
    } else if !validExt(path, ".mp3") && !validExt(path, ".webp") && !validExt(path, ".jpg") {
        utils.Error(ctx, errors.New("Failed to get file."));

        return;
    }

    services.ServeService(ctx, path);
}

func validExt(path string, ext string) bool {
    extension := path[len(path) - len(ext):];

    if extension == ext {
        return true;

    }

    return false;
}
