# Tauras Backend

## How to setup on local

```sh
docker build --no-cache \
    --tag quay.io/yoshimitsu_egashira_ibm/team-taurus-backend:<VERSION> .

docker login quay.io
username:
password:

docker run --name taurus-backend --rm \
    --publish 8000:8000 \
    quay.io/yoshimitsu_egashira_ibm/team-taurus-backend:<VERSION>

docker push quay.io/yoshimitsu_egashira_ibm/team-taurus-backend:<VERSION>
```

## OC login
ブラウザ > ibm cloud > openshift (2112072-ITZ-V2) >openshift web console
※新しいクラスターを選択（語尾がvrg）

ocコンソールの右上からログインコマンドのコピー

```sh
oc login --token=<TOKEN> --server=<SERVER NAME>

oc config current-context

oc new-project team-taurus-backend
```

## Run on K8S

```sh
# Create deployment
oc apply -f ./kubernetes/deployment.yaml

# Check runnning the two pods.
oc get pods
NAME                                   READY   STATUS    RESTARTS   AGE
team-taurus-backend-5c9556fb76-g8trd   1/1     Running   0          36s
team-taurus-backend-5c9556fb76-knx7v   1/1     Running   0          36s
```
