<div align="center">
  <img src="./icon.png" width="128" />
  
  <h1>Moo...</h1>
</div>

<br />

**Mobile version coming soon**

<br />

<a id="updating"></a>
## ♻️ Updating

1. Move to a directory before project directory (ex: Project directory is "/path/to/project", move to "/path/to/").
2. Run `git clone https://github.com/imf4ll/moo` to download latest version.

**If you want versions without being latest, check "Releases" page.**

<br />

## 😎 About
If you're tired of searching for downloaders across the internet cause the domain was been seized,
here are my solution, a CLI and a self-hosted service to avoid these problems, just install and download
videos from your terminal or in-browser running the self-hosted service powered by React, Vite on frontend
and Golang and Python on backend.

<br />

## 📜 Requirements:
- Python
- Node.JS
- Go
- Yarn (needed to work with workspaces)

<br />

## ❗️ Install:

<div align="center">
  <h3>CLI</h3>
  
  <a href="https://github.com/imf4ll/moo/tree/master/cli">View more</a>
</div>

#### 🐧 Linux
```bash
$ cd cli/

$ make install
```

<br />

### 🪟 Windows
1. Setup installer:
```bash
$ cd cli/

$ pip3 install -r requirements.txt

$ pip3 install -U pyinstaller

$ pyinstaller --onefile src/moo.py
```

2. Move the builded .EXE to executables folder and use from console (Check your Environment Variables).

<hr />

<div align="center">
  <h3>Web (UNDER DEVELOPMENT, I'll create fully automated installing when the development finish)</h3>

  <a href="https://github.com/imf4ll/moo/tree/master/web">View more</a>
</div>

<br />

1. Install yarn (if you don't have installed):
```bash
$ npm install --global yarn
```

2. Setup yarn enviroment:
```bash
$ yarn set version latest # (will be needed to work with workspaces properly)

$ yarn install
```

3. Build and start:
```bash
$ cd web

# If you wanna run in development mode, just run `yarn run dev`

$ yarn run build

$ yarn run start # If you're on Windows, you'll need to modify 'start' script of package.json, just add .exe on front of './backend'
```

<br />

