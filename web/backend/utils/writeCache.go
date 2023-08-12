package utils

import (
    "os"
    "encoding/json"
    "fmt"
    
    "github.com/imf4ll/moo/backend/types"
    
    "github.com/gin-gonic/gin"
)

var cache_file = fmt.Sprintf("%s/moo-cache.json", os.TempDir());

func WriteCache(cache []byte, ctx *gin.Context) {
    f, err := os.ReadFile(cache_file)
    if err != nil {
        _, err := os.Create(cache_file)
        if err != nil {
            ctx.JSON(403, gin.H {
                "error": "Multiple fails on caching system, check for write permissions, please.",
            });

            ctx.Abort();

            return;
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

    os.WriteFile(cache_file, data, 0644);
}

func remove(slice []types.Cache, s int) []types.Cache {
    return append(slice[:s], slice[s + 1:]...)

}
