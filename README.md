# kardex

### Overview
This project is compound of two parts:
1. The `src` folder where all the implementation for the API is placed. There we have defined our routes, models, controllers, validatos and also some adapters
2. The `test` folder which basically is the YML configuration file for Artillery which is going to simulate concurrency of request from a given amoung of users during an specified amount of time. 

### How to run RabbitMQ server
As a single and easier alternative, we introduced the usage od DOCKER COMPOSE to start our services. If you want, you can run following commands in the root of the project to have all servers working:

* To create and start all docker instances: `docker-compose up -d`
* To stop all docker instances: `docker-compose stop`
* To start all docker instances: `docker-compose start`
* To stop and destroy all docker instances: `docker-compose down`

### How to run the Kardex API?
Follow next steps in order to run the Kardex API:
1. Clone project: `git clone`
2. Get into the cloned folder: `cd kardex`
3. Install dependencies: `npm install`
4. Start the Kardex API: `npm run start`
5. Kardex API should be available at: http://localhost:5000

### How to run Artillery tests?
To run artillery test, run: `npm run test`

As result you will see following output in the ExpressJS server ouput which highlihgts the *weighted price* calculated before queueing in the RabbitMQ server and another value after consuming it. That demostrates the eventual consistency.

```
QUEUED >>> PRODUCT ID: 8a4f972e-35c2-40bb-a57b-71b72ddafb31 | WEIGHTED PRICE: 5192 <--
GOT <<<<<< PRODUCT ID: 8a4f972e-35c2-40bb-a57b-71b72ddafb31 |          PRICE: 9639
SAVED ==== PRODUCT ID: 8a4f972e-35c2-40bb-a57b-71b72ddafb31 | WEIGHTED PRICE: 5192 <--

QUEUED >>> PRODUCT ID: 38a5e049-f726-48a8-a195-1b327510ca3d | WEIGHTED PRICE: 6309 <--
GOT <<<<<< PRODUCT ID: 38a5e049-f726-48a8-a195-1b327510ca3d |          PRICE: 5850
SAVED ==== PRODUCT ID: 38a5e049-f726-48a8-a195-1b327510ca3d | WEIGHTED PRICE: 6309 <--

QUEUED >>> PRODUCT ID: b4c29391-1146-47f1-8a3b-aca22b372ec5 | WEIGHTED PRICE: 6343 <--
GOT <<<<<< PRODUCT ID: b4c29391-1146-47f1-8a3b-aca22b372ec5 |          PRICE: 2720
SAVED ==== PRODUCT ID: b4c29391-1146-47f1-8a3b-aca22b372ec5 | WEIGHTED PRICE: 6343 <--
```

Also, in the console log from the execution of the artifactory test, you should notice some stats/summary of all execution:

```
All virtual users finished
Summary report @ 11:54:04(-0400) 2020-03-25
  Scenarios launched:  1200
  Scenarios completed: 1200
  Requests completed:  1200
  Mean response/sec: 39.43
  Response time (msec):
    min: 1.2
    max: 53.4
    median: 2
    p95: 4.2
    p99: 6.4
  Scenario counts:
    Get all records: 599 (49.917%)
    Register a record: 601 (50.083%)
  Codes:
    200: 599
    201: 601
```

### Available end-points
Following are the available end-poits:
> GET http://localhost:5000/api/v1/kardex/records

Return all Kardex Records available in the DB

> POST http://localhost:5000/api/v1/kardex/records

Creates a new record in the Kardex. Expected payload:
```
{
  productId: String,
  quantity: Number,
  price: Number,
}
```
