```sh
docker build --tag quay.io/yoshimitsu_egashira_ibm/team-taurus-backend:<TAG> --no-cache .

docker login quay.io


docker push quay.io/yoshimitsu_egashira_ibm/team-taurus-backend:<TAG>
```


docker build --tag quay.io/yoshimitsu_egashira_ibm/team-taurus-backend:v1.0 --no-cache .
