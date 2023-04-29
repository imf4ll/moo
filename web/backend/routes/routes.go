package routes

import (
    "github.com/imf4ll/moo-web/backend/controllers"

    "github.com/gin-gonic/gin"
)

func Routes(app gin.Engine) *gin.RouterGroup {
    api := app.Group("/")
    {
        api.GET("/search", controllers.SearchController)
        api.GET("/video", controllers.GetVideoController)
        api.GET("/download", controllers.DownloadController)
    }

    return api;
}
