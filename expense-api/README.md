# Expense-API
Expense API Project. Project consists of API to serve data to UI and perform operation.

## Project Status
Currently, in development mode.

## Available Profile
- local
- prod

## Prerequisite
- Java 11
- Maven

## Run Application in Local
In [application.yaml]() set property spring.profiles.active to local or while maven compile select profile as local using cmd
```shell
mvn clean compile -Plocal
```

## Access h2 db 
[DB](http://localhost:8090/h2-console)

## User Detail for Local
Configured in [application-local.yaml](src/main/resources/application-local.yaml) file 

## Build Application:
```shell
mvn install -p<local|prod>
```

## Deployment/ Release:
- Merge develop to master
- Run [Pre Release Pipeline](https://github.com/codesnaper/expense/actions/workflows/release.yml)
- Enter server IP address to pipeline input
- Pipeline will build and deploy app to server and will start the application.
- Pipeline will create pre-release PR.
- Merge the PR
- [Release Pipeline]() will start and create tag in github.

## Project Directory
```text
|- public (Folder contain all static serverd file and directly put in build while build )
|- src (Source code)
    |- __tests__ (Directory contain test file)
    |- component (Directory contain all the component file)
```
