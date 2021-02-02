#!/bin/sh

datei_path=$2
datei_name=$3
source=$1/$datei_name
echo "Make Link script"
echo $source

ln -s $datei_path $source
