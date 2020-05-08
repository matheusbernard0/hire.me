# Hire.me Challenge

## Prerequisites:
- Docker 19.03 or newer
- docker-compose 1.22 or newer
- Git
- Node 12.14.1 or newer
---

## Clonning project:
```
$ git clone https://github.com/matheusbernard0/hire.me
  ```
## Installing dependencies:
```
$ cd hire.me
$ npm install
```

## Running tests:
```
$ npm test
```
  
## Running application stack ( Application and MySQL Instance):
```
$ docker-compose up
```

## Killing application stack:
```
$ docker-compose down
```

## Documentation:

### Create URL:
```
POST http://localhost:3000/shortener?url=<string>&CUSTOM_ALIAS=<string>
```

---
### Retrieve URL
```
GET http://localhost:3000/shortener/{alias}
```

---
### FindMostVisiteds
```
GET http://localhost:3000/shortener/mostVisiteds/{quantity}
```