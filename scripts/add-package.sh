#!/bin/bash

echo 'Installing ' $1

docker exec -w /opendatavisualization -it opendatavisualization sh -c "npm install $1"

