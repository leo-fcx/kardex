const records =  [];

const timeout = 3000;

export default {
  create: function(record) {
    const delay = new Promise(resolve => setTimeout(resolve, timeout));

    record.id = records.length + 1;

    return delay.then(() => records.push(record));
  },

  get: function() {
    return Promise.resolve(records);
  }
};