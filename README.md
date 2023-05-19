# Database Final Projects

## User Manual

Here are some tips for programming in each language and framework

### Frontend: HTML CSS JavaScript

### Backend: Python Flask

### Database: MySQL Server

\*Some commands only work for MacOS using homebrew\*

- install MySQL

```
brew install mysql
```

- run the server

```
brew services start mysql
```

- check server status

```
brew services list
```

- stop the server

```
brew services stop mysql
```

- login to database

```
mysql -u root
```

- exit database

```
exit
```

### Gcloud Service

- deploy service
  

- connect to mysql
  gcloud sql connect myinstance -u root

- import csv to database
  gcloud sql import csv myinstance gs://asia.artifacts.database-final-project-386818.appspot.com/bike.csv --database=database_final_project --table=BIKE
