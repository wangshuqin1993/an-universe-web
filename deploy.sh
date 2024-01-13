#!/bin/bash
rm -rf dist/
npm run build
docker build -t hamstershare/hamster-nft-frontend:$1 .
docker push hamstershare/hamster-nft-frontend:$1
kubectl apply -f pipeline.yml -n hamster
kubectl get pods -n hamster
