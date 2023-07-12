package controllers

import (
    "errors"

    "github.com/imf4ll/moo-web/backend/services"
    "github.com/imf4ll/moo-web/backend/utils"

    "github.com/gin-gonic/gin"
)

func SearchController(ctx *gin.Context) {
    query := ctx.Query("query");
    mode := ctx.Query("mode");

    if query == "" || mode == "" {
        utils.Error(ctx, errors.New("Invalid query."))
   
        return
    }

    videos, err := services.SearchService(query, mode);
    if err != nil {
        utils.Error(ctx, err);

        return
    }

    ctx.JSON(200, gin.H {
        "videos": videos,
    });
}
