class Record {
  constructor(data) {
    this.timestamp = Date.now();
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.price = data.price;
  }
}

export default Record;
