package middlewares

import (
    "encoding/json"
    "os"
    "fmt"
    "time"

    "github.com/imf4ll/moo/backend/types"

    "github.com/gin-gonic/gin"
)

func CacheMiddleware(ctx *gin.Context) {
    id := ctx.Query("id");

    data, err := os.ReadFile("./utils/cache.json")
    if err != nil {
        fmt.Println("Failed to get cache, skipping middleware.", err);
        
        ctx.Next();
    }

    var parsed []types.Cache;

    err = json.Unmarshal(data, &parsed)
    if err != nil {
        fmt.Println("Failed to get cache, skipping middleware.", err);

        ctx.Next();
    }
        
    now := time.Now().UnixMilli();

    for _, item := range parsed {
        if item.ID == id {
            if ((now - item.Timestamp) / 1000 / 60 / 60) >= 1 {
                ctx.Next();

            } else {
                if item.Photo != "" {
                    ctx.JSON(200, gin.H {
                        "id": item.ID,
                        "photo": item.Photo,
                        "name": item.Name,
                        "playlists": item.Playlists,
                    });
                
                } else if len(item.Videos) > 0 {
                    ctx.JSON(200, gin.H {
                        "videos": item.Videos,
                    });

                } else {
                    ctx.JSON(200, gin.H {
                        "audio": item.Audio,
                    });
                }
                
                ctx.Abort();

                return;
            }
        }
    }

    ctx.Next();
}
