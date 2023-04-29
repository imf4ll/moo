package utils

import (
    "github.com/gin-gonic/gin"
)

func Error(ctx *gin.Context, err error) {
    ctx.JSON(400, gin.H {
        "error": err.Error(),
    });
}
