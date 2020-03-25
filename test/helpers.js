'use strict';

module.exports = {
  generateRandomRecord
};

// Make sure to "npm install faker" first.
const Faker = require('faker');
const productIds = [
  Faker.random.uuid(),
  Faker.random.uuid(),
  Faker.random.uuid(),
  Faker.random.uuid(),
  Faker.random.uuid(),
  Faker.random.uuid(),
  Faker.random.uuid(),
  Faker.random.uuid(),
  Faker.random.uuid(),
  Faker.random.uuid(),
];

function generateRandomRecord(userContext, events, done) {
  // generate data with Faker:
  const productId = productIds[Math.floor(Math.random() * 10)];
  const quantity = Math.floor(Math.random() * 100) + 1;
  const unitPrice = Math.floor(Math.random() * 100) + 90;
  const price = unitPrice * quantity;
  // add variables to virtual user's context:
  userContext.vars.productId = productId;
  userContext.vars.quantity = quantity;
  userContext.vars.price = price;
  // continue with executing the scenario:
  return done();
}