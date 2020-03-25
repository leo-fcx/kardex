import amqp from 'amqplib';

const getChannel = function(key, cb) {
  console.log(process.env.USER, process.env.PASS);
  return amqp
    .connect(`amqp://${process.env.USER}:${process.env.PASS}@0.0.0.0:5672`)
    .then(function(connection) {
      console.log('RabbitMQ client opened connection.');
      return connection.createChannel();
    })
    .then(function(channel) {
      console.log('RabbitMQ client created channel.');
      return channel
        .assertQueue(key)
        .then(function(ok) {
          console.log(`RabbitMQ client is using channel: ${key}`);
          cb(channel);
        });
    })
    .catch(console.warn);
};

class RecordAdapter {

  constructor(controller) {
    const self = this;

    this.controller = controller;
    this.key = 'records';

    getChannel(this.key,channel => this.channel = channel);


  }

  create(record) {
    this.initConsumer();
    this.channel.sendToQueue(this.key, Buffer.from(JSON.stringify(record)));

    return Promise.resolve({ something: undefined });
  }

  get() {
    return Promise.resolve(this.controller.get());
  }

  initConsumer() {
    if (this.isConsumerInitialized) return;

    this.channel
      .consume(this.key, (msg) => {
        if (msg === null) return;

        const data = msg.content.toString();
        const parsedData = JSON.parse(data);

        console.info(`GOT <<<<< PRODUCT ID: ${parsedData.productId} |          PRICE: ${parsedData.price}`);

        this.controller.create(parsedData);
        this.channel.ack(msg);
      });

    this.isConsumerInitialized = true;
  }
}

export default RecordAdapter;