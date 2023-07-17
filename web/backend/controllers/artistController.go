package controllers

import (
    "encoding/json"
    "errors"
    "time"

    "github.com/imf4ll/moo-web/backend/services"
    "github.com/imf4ll/moo-web/backend/utils"
    "github.com/imf4ll/moo-web/backend/types"

    "github.com/gin-gonic/gin"
)

type CacheArtist struct {
    ID string `json:"id"`
    Name string `json:"name"`
    Photo string `json:"photo"`
    Playlists []types.PlaylistSearch `json:"playlists"`
    Timestamp int64 `json:"timestamp"`
}

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

    data, _ := json.Marshal(CacheArtist{ID: artist.ID, Name: artist.Name, Photo: artist.Photo, Playlists: playlists, Timestamp: time.Now().UnixMilli()});

    utils.WriteCache(data, ctx);

    ctx.JSON(200, gin.H {
        "artist": artist,
        "playlists": playlists,
    });
}
