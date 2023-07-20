package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Moo",
		Width:  1024,
		Height: 640,
                MinWidth: 1024,
                MinHeight: 640,
                DisableResize: false,
                Fullscreen: false,
                WindowStartState: options.Maximised,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
                Windows: &windows.Options {
                    DisableWindowIcon: true,
                },
                Mac: &mac.Options {
                    About: &mac.AboutInfo {
                        Title: "Moo",
                        Message: "Stream music directly from YouTube",
                        Icon: icon,
                    },
                },
                Linux: &linux.Options {
                    Icon: icon,
                },
                Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		log.Fatal("Error:", err.Error())
	}
}
