package utils

import (
    "os"
    "encoding/json"
    
    "github.com/imf4ll/moo-web/backend/types"
    
    "github.com/gin-gonic/gin"
)

func WriteCache(cache []byte, ctx *gin.Context) {
    f, err := os.ReadFile("./utils/cache.json")
    if err != nil {
        _, err := os.Create("./utils/cache.json")
        if err != nil {
            ctx.JSON(403, gin.H {
                "error": "Multiple fails on caching system, check for write permissions, please.",
            });

            ctx.Abort();
        }

        write(cache, []byte{});
    }

    write(cache, f);
}

func write(cache []byte, previousCache []byte) {
    var cacheFile []types.Cache
    var cacheToAdd types.Cache

    json.Unmarshal(cache, &cacheToAdd);
    json.Unmarshal(previousCache, &cacheFile);

    if len(previousCache) > 0 {
        for k, i := range cacheFile {
            if i.ID == cacheToAdd.ID { remove(cacheFile, k) }
        }
    }

    cacheFile = append(cacheFile, cacheToAdd);

    data, _ := json.Marshal(cacheFile);

    os.WriteFile("./utils/cache.json", data, 0644);
}

func remove(slice []types.Cache, s int) []types.Cache {
    return append(slice[:s], slice[s + 1:]...)

}
