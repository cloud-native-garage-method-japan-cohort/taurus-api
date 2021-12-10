#!/bin/sh
source .env

kubectl create secret \
    -n team-taurus-backend \
    docker-registry quay-io-team-taurus-backend-password \
    --docker-server=$CONTAINER_REGISTRY_SERVER \
    --docker-username=$CONTAINER_REGISTRY_USER \
    --docker-password=$CONTAINER_REGISTRY_PASSWORD
