# Tauras Backend

## How to setup on local

```sh
docker build --tag quay.io/yoshimitsu_egashira_ibm/team-taurus-backend:<TAG> --no-cache .

docker login quay.io
username:
password:

docker push quay.io/yoshimitsu_egashira_ibm/team-taurus-backend:<TAG>
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
oc apply -f ./kubernetes/deployment.yaml

oc get pods

```
