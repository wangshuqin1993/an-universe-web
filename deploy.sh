#!/bin/bash
rm -rf dist/
npm run build
docker build -t hamstershare/bmaker-frontend:$1 .
docker push hamstershare/bmaker-frontend:$1
