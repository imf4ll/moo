package main

import (
    "github.com/imf4ll/moo-web/backend/routes"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {
    app := gin.Default();
    app.Use(cors.Default());

    routes.Routes(*app);

    app.Run(":3001");
}
