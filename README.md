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
oc apply -f ./k8s/deployment.yaml

# Check runnning the two pods.
oc get pods
NAME                                   READY   STATUS    RESTARTS   AGE
team-taurus-backend-5c9556fb76-g8trd   1/1     Running   0          36s
team-taurus-backend-5c9556fb76-knx7v   1/1     Running   0          36s

oc apply -f ./k8s/service.yaml

oc get svc
NAME                          TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
team-taurus-backend-service   NodePort   172.21.145.149   <none>        80:30196/TCP   30s

oc apply -f ./k8s/route.yaml

oc get all
```

## Prepare create pipeline by Tekton

```sh
oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/git-clone/0.5/git-clone.yaml

oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/npm/0.1/npm.yaml

oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/yaml-lint/0.1/yaml-lint.yaml

oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/buildah/0.2/buildah.yaml

oc get tasks
NAME        AGE
buildah     7s
git-clone   15m
npm         15m
yaml-lint   15m
oc apply -f ./tekton/pvc.yaml
```

```sh
oc apply -f ./tekton/team-taurus-backend-pipeline.yaml
tkn pipeline list

oc apply -f ./kustomize-build-task.yaml
oc apply -f ./test-deploy-task.yaml

chomod +x create_sa.sh create_secret.sh
sh ./create_secret.sh
oc get secret
sh ./create_sa.sh

oc create -f ./tekton/team-taurus-backend-pipeline-run.yaml

oc apply -f ./tekton/team-taurus-backend-pipeline.yaml
```
