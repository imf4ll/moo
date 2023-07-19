package controllers

import (
    "errors"

    "github.com/imf4ll/moo/backend/services"
    "github.com/imf4ll/moo/backend/utils"

    "github.com/gin-gonic/gin"
)

func SearchController(ctx *gin.Context) {
    query := ctx.Query("query");

    if query == "" {
        utils.Error(ctx, errors.New("Invalid query."))
   
        return
    }

    videos, playlists, artist, err := services.SearchService(query);
    if err != nil {
        utils.Error(ctx, err);

        return
    }

    ctx.JSON(200, gin.H {
        "videos": videos,
        "playlists": playlists,
        "artist": artist,
    });
}
