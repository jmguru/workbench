#!/bin/sh

HERE=$(pwd)
CMD='node app.js'
nohup $CMD </dev/null >/dev/null 2>&1 &
