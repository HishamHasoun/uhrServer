#!/bin/sh

datei_name=$3
datei_path=$2/$datei_name
source=$1
echo "Make Link script"
echo $source
echo $datei_path
echo ${datei_name}

case $datei_name in
*.mp3)
    echo "mp3"
    ;;
*)
    echo "not mp3"
    if [ ! -d $source/file ]; then
        echo "kein File folder"
        mkdir $source/file
    fi
    source=$source/file
    ;;
esac

if [ -f $source/$datei_name ]; then
    echo "schon da"
    rm $source/$datei_name
fi
ln -s $datei_path $source
