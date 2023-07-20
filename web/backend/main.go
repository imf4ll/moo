package main

import (
    "log"
    "os"
    "fmt"

    "github.com/imf4ll/moo/backend/routes"
    
    "github.com/joho/godotenv"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Failed to load .env.");

    }

    port := os.Getenv("MOO_PORT");

    app := gin.Default();
    app.Use(cors.Default());

    routes.Routes(*app);

    app.Run(fmt.Sprintf(":%s", port));
}
