#!/bin/bash
clear
echo "Stopping"
docker-compose stop
echo "Building"
docker-compose build
echo "Running"
docker-compose up -d
echo "Rebuilding docker-compose containers done!"

# notification
docker build -f api/Dockerfile.Console.UserMonitorNotifications -t duennausermonitornotifications ./api

