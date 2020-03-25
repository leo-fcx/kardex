import db from "../db";

class RecordController {

  create(record) {
    return Promise.resolve(db.create(record));
  }

  get() {
    return Promise.resolve(db.get());
  }
}

export default RecordController;