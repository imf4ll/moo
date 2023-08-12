#!/bin/sh

if ! command -v go &>/dev/null ; then
  echo -e "\e[1;31m'Go' not installed.\e[0m"

elif ! command -v httpd &>/dev/null ; then
  echo -e "\e[1;31m'Apache' not installed.\e[0m"

elif ! command -v npm &>/dev/null ; then
  echo -e "\e[1;31m'NPM' not installed.\e[0m"
else
  echo -e "\e[1;32mBuilding backend:\e[0m"
  sudo mkdir /opt/moo/
  
  cd backend
  go build
  sudo mv ./backend /opt/moo/

  echo -e " \e[1;32mOK.\e[0m"

  echo -e "\n\e[1;32mBuilding and setting up Apache frontend:\e[0m"
  cd ../frontend

  npm install --legacy-peer-deps && npm run build

  sudo cp -r dist/* /srv/http/
  rm -rf node_modules/

  cd ../

  echo -e "\n\e[1;32mCreating service and enabling:\e[0m"
  sudo cp utils/moo-manual.service /etc/systemd/system/moo.service
  sudo systemctl daemon-reload
  sudo systemctl enable --now moo.service
  sudo systemctl enable --now httpd

  echo -e "\n\e[1;32mInstalled! Access from a web browser on http://localhost:80.\e[0m"
fi
