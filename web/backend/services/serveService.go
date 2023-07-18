package services

import (
    "errors"
    "io/ioutil"

    "github.com/imf4ll/moo-web/backend/utils"

    "github.com/gin-gonic/gin"
)

func ServeService(ctx *gin.Context, path string) {
    b, err := ioutil.ReadFile(path)
    if err != nil {
        utils.Error(ctx, errors.New("Failed to get file."));

    }

    ctx.Data(200, "application/octet-stream", b);
}
