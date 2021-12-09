#!/bin/bash
kubectl patch serviceaccount build-bot -p '{"imagePullSecrets": [{"name": "quay-io-wataru-nishiki-password"}]}'
