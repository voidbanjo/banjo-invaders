#!/bin/bash

mkdir -p /tmp/get-firefox-46

# lets work in the tmp folder
cd /tmp/get-firefox-46

## firefox 46
wget -O firefox-46.tar.bz2 https://ftp.mozilla.org/pub/firefox/releases/46.0/linux-x86_64/en-US/firefox-46.0.tar.bz2

tar -jxf firefox-46.tar.bz2

sudo mv firefox /opt/firefox46

sudo chown root:users /opt/firefox46

sudo ln -s /opt/firefox/firefox /usr/bin/firefox
