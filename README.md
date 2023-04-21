<div align="center">
    <img src="./assets/cow.png" />
    <h3>Download musics directly from YouTube</h3>
</div>

<br /><br/>
Download any music from YouTube just by searching or giving a URL, just moo.
<br /><br/>

## 📖 Changelog:

- Added --first to download very first result

<br /><br />

## ❗️Usage (without need installation):
```bash
python3 src/moo.py
```

<br /><br/>

## ❗️ Install:

### Linux
```bash
make install
```

<br /><br/>

### Windows
1. `pip3 install -U pyinstaller`

2. `pyinstaller --onefile src/moo.py`

3. Move to executables folder and use from console.

<br /><br/>

## ❓Arguments:

| Option | Description |
|--------|-------------|
| -f, --filename | Set the filename
| -p, --path | Set the final path
| -m, --max | Set the max number of result while search
| -F, --first | Download very first result without needing choose

<br /><br/>

## ❓Examples:
1. By searching:

```bash
moo xxxtentacion
```

<div align="center">
    <img align="center" src="./assets/example1.png" />
</div>

<br /><br/>

2. By giving a URL:

```bash
moo https://www.youtube.com/watch?v=mwgZalAFNhM
```

<div align="center">
    <img align="center" src="./assets/example2.png" />
</div>

<br /><br/>

3. Using filename and path arguments:

```bash
moo 2pac -f hitemup.mp3 -p ~/Downloads
```

<div align="center">
    <img src="./assets/example3.png" />
</div>
