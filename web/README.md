## ❗️ Install:

#### 🐧 Linux
1. Move to web/ directory

2. Setup pnpm environment:
```bash
$ pnpm install && cd frontend; pnpm install
```

3. Build and run:
```bash
# The step above will move your directory, take a step back to run all properly
$ cd ../

# If you wanna run in development mode, just run `pnpm run dev`
$ pnpm run build

$ pnpm run start # By default web interface's location is http://localhost:3000/
```

### Creating a shell script to automate deploy on system startup

4. Move the directory for a most positional location or still using the same (I personally recommend moving to "/opt").

5. Get full path of builded "moo" (normally **/yourpath**/moo/web)

6. Let's write a shell script (moo.sh):
```
#!/bin/bash

# The path you chose goes here
cd PATHYOUCHOSE/moo/web

# Make sure you builded backend and frontend!!!
pnpm run start
```

- Now you can use that shell script to run the server on computer startup.

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

<br />

#### 🪟 Windows
1. Move to web/

2. Setup pnpm environment:
```bash
$ pnpm install

$ cd frontend

$ pnpm install
```

4. Build and run:
```bash
# The step above will move your directory, take a step back to run all properly
$ cd ../

# If you wanna run in development mode, just run `pnpm run dev`
$ pnpm run build

$ pnpm run start # By default web interface's location is http://localhost:3000/
```

**I can't provide a guide to run on startup cause I don't have access to a Windows system.
Maybe any guide of how to run scripts/programs on Windows startup can serve your desires. (Feel free to made a PR 
implementing a guide!!)**
