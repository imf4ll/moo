<img src="./assets/showcase.png" />

## ❗️ Install:

#### 🐧 Linux
1. Install yarn (if you don't have installed):
```bash
$ npm install --global yarn
```

2. Setup yarn enviroment:
```bash
$ yarn set version latest # (will be needed to work with workspaces properly)

$ yarn install
```

3. Build:
```bash
$ cd web

# If you wanna run in development mode, just run `yarn run dev`

$ yarn run build
```

**Creating a shell script to automate deploy**

4. Move the directory for a most positional location or still using the same (I personally recommend moving to "/opt").

5. Get full path of builded "moo" (normally **/yourpath**/moo/web)

6. Let's write a shell script (moo.sh):
```
#!/bin/bash

# The path you chose goes here
cd PATHYOUCHOSE/moo/web

# Make sure you builded backend and frontend!!!
yarn run start
```

7. Now you can use that shell script to run the server on computer startup.

Example with systemd:

1. Let's write the service (moo.service):
```
[Service]
Type=simple
ExecStart=/bin/bash /PATH/TO/moo.sh

[Install]
WantedBy=multi-user.target
```

2. Move the service to /etc/systemd/system (Needs sudo)

3. Giving permission and enabling
```sh
$ chmod 644 /etc/systemd/system/moo.service

$ sudo systemctl enable moo.service

$ sudo systemctl start moo.service
```

4. OPCIONAL: If you want to check if is everything ok, you could run `systemctl status moo`
