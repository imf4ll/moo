<div align="center">
  Maybe Windows users will face problems in downloads, i'm currently testing compatibility fixes on that
</div>

<br />

<div>
  <div align="center">
  <img src="./mockup.png" width="100%" />

  <br />
  <br />
  
  <p>If you are tired of abusive ads while listening and web downloaders being seized, give MOO a chance!!! Lightweight, simple and objective.
  </p>
  </div>

  <br />

  - **Play local songs:** Access and play your locally stored music files effortlessly, ensuring quick access to your favorite tracks.
  - **Download songs:** Keep your favorite songs for offline listening by easily downloading them through Moo.
  - **Stream from YouTube:** Discover a vast collection of songs on YouTube, and with Moo, you can stream them directly without any hassle.
  - **Playlist management:** Organize and save playlists with ease. Create your customized playlists, add songs from your local library or YouTube, and manage them just the way you like.
</div>

<br />

<div align="center">
  <h3>Desktop</h3>

  <a href="https://github.com/imf4ll/moo/tree/master/desktop">How to install and use</a>

  **Pre-builded binaries and executables (Only for desktop version):**

  | OS | Binary |
  |-------|------|
  | Linux | [Download](https://github.com/imf4ll/moo/releases/download/v0.1.4-rc2/moo-linux.zip) |
  | Windows | [Download](https://github.com/imf4ll/moo/releases/download/v0.1.4-rc2/moo-windows.zip) |
  | MacOS | Currently not supported by Wails, follow the [steps](https://github.com/imf4ll/moo/tree/master/desktop/README.md) to build  |

  **If any of these pre-builded binaries fail to run, you'll need to build manually following the [steps](https://github.com/imf4ll/moo/tree/master/desktop).**
</div>

<br />

<div align="center">
  <h3>Web</h3>

  <a href="https://github.com/imf4ll/moo/tree/master/web">How to install and use</a>
</div>

<br />

<div align="center">
  <h3>CLI</h3>
  
  <a href="https://github.com/imf4ll/moo/tree/master/cli">How to install and use</a>
</div>

<br />

<hr /> 

<br />

## 📜 Requirements:
- [Python](https://www.python.org/downloads/) (and [yt-dlp]("https://github.com/yt-dlp/yt-dlp") -> `pip install yt-dlp`) 
- [Node.JS](https://nodejs.org/)
- [Go](https://go.dev/dl/) (and [Wails]("https://wails.io/docs/gettingstarted/installation"))
- [pnpm](https://pnpm.io/pt/installation)

<br />

<a id="updating"></a>
## ♻️ Updating

#### Desktop
1. Move to root directory of moo

2. Pull and rebuild
```
$ git pull origin master

$ cd desktop/

# All builded binaries and exes are storaged on 'build' directory
$ wails build
```

#### Web
1. Move to root directory of moo

2. Pull and rebuild
```
$ git pull origin master

$ cd web/

$ pnpm run build
```

3. ONLY IF USED AS SERVICE OF SYSTEMD ON LINUX: `sudo systemctl restart moo.service`

#### CLI
1. Move to root directory of moo

2. Pull and rebuild
```
$ git pull origin master

$ cd cli/

# LINUX
$ make install

# WINDOWS
$ pyinstaller --one-file src/moo.py
```
