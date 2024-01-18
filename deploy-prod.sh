#!/bin/bash
rm -rf dist/
npm run build
docker build -t hamstershare/absc-frontend:$1 .
docker push hamstershare/absc-frontend:$1
