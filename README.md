# kardex

### Overview
This project is compound of two parts:
1. The `src` folder where all the implementation for the API is placed. There we have defined our routes, models, controllers, validatos and also some adapters
2. The `test` folder which basically is the YML configuration file for Artillery which is going to simulate concurrency of request from a given amoung of users during an specified amount of time. 

### How to run the Kardex API?
Follow next steps in order to run the Kardex API:
1. Clone project: `git clone`
2. Get into the cloned folder: `cd kardex`
3. Install dependencies: `npm install`
4. Start the Kardex API: `npm run start`
5. Kardex API should be available at: http://localhost:5000

### How to run Artillery tests?
To run artillery test, run: `npm run test`

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
