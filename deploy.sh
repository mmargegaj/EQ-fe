#!/bin/zsh

npm run build;
scp -r build/ root@62.171.176.99:/var/www/html/
