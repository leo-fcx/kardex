import db from "../db";

const weightedProducts = {};

class RecordController {

  create(record) {
    if (!weightedProducts[record.productId]) {
      weightedProducts[record.productId] = {
        previousLastPrice: 0,
        lastPrice: 0,
        weightedPrice: 0,
      }
    }
    const weightedProduct = weightedProducts[record.productId];

    if (!weightedProduct.lastPrice) {
      weightedProduct.lastPrice = record.price;
    }

    weightedProduct.previousLastPrice = weightedProduct.lastPrice;
    weightedProduct.lastPrice = record.price;
    weightedProduct.weightedPrice = (weightedProduct.lastPrice + weightedProduct.previousLastPrice) / 2;

    console.info(`SAVED ==== PRODUCT ID: ${record.productId} | WEIGHTED PRICE: ${weightedProduct.weightedPrice} <--`);

    return Promise.resolve(db.create(record));
  }

  get() {
    return Promise.resolve(db.get());
  }
}

export default RecordController;