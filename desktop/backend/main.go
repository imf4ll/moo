package backend

import (
    "github.com/imf4ll/moo/backend/routes"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func Backend() {
    app := gin.Default();
    app.Use(cors.Default());

    routes.Routes(*app);

    app.Run(":3001");
}
