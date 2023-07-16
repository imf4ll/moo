package controllers;

import (
    "errors"

    "github.com/imf4ll/moo-web/backend/utils"
    "github.com/imf4ll/moo-web/backend/services"

    "github.com/gin-gonic/gin"
)

func ArtistController(ctx *gin.Context) {
    id := ctx.Query("id")

    if id == "" || len(id) != 24 {
        utils.Error(ctx, errors.New("Invalid channel ID."));

        return;
    }

    artist, playlists, err := services.ArtistService(id)
    if err != nil {
        utils.Error(ctx, err);

    }

    ctx.JSON(200, gin.H {
        "artist": artist,
        "playlists": playlists,
    })
}
