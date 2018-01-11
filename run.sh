#!/bin/bash

# remove earlier containers, if any
docker stop vr_tool
docker rm vr_tool

# run new container in interactive terminal mode
docker run \
       -it \
       --name vr_tool \
       --mount type=bind,source="$(pwd)/app",target=/var/www \
       -p 4000:4000 \
       vr_tool;