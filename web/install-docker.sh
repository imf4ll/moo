#!/bin/sh

trap - INT

echo -e "\n\e[1;32mBuilding Docker image:\e[0m"
sudo docker build -t moo .
sudo docker image prune --filter label=moo=builder

echo -e "\n\e[1;32mCreating service and running as a daemon:\e[0m"
sudo cp utils/moo-docker.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now moo-docker.service

echo -e "\n\e[1;32mInstalled! Access from a web browser on http://localhost:4546.\e[0m"
