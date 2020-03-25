import express from 'express';
import bodyParser from 'body-parser';
import Record from './models/record';
import RecordAdapter from './adapters/record';
import RecordController from './controllers/record';
import RecordValidator from './validators/record';

// Set up the express app
const app = express();
const recordController = new RecordAdapter(new RecordController());
const recordValidator = new RecordValidator();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all records
app.get('/api/v1/kardex/records', (req, res) => {
  recordController
    .get()
    .then(function(records) {
      return res.status(200).send({
        success: 'true',
        message: 'Records retrieved successfully',
        records
      });
    })
    .catch(function(error) {
      const payload = {
        success: 'false',
        message: 'Something went wrong.',
        error
      };

      console.error(payload);
      res.status(400).send(payload);
    });
});

// create a record
app.post('/api/v1/kardex/records', (req, res) => {
  const record = new Record(req.body);
  const validationResult = recordValidator.validate(record);

  if (!validationResult.isValid) {
    console.error(validationResult.error);
    return res.status(400).send(validationResult.error);
  }

  recordController
    .create(req.body)
    .then(function(record) {
      return res.status(201).send({
        success: 'true',
        message: 'Record added successfully',
        record
      });
    })
    .catch(function(error) {
      const payload = {
        success: 'false',
        message: 'Something went wrong.',
        error
      };

      console.error(payload);
      res.status(400).send(payload)
    });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log('------------------------------');
  console.log(`server running on port ${PORT}`);
  console.log('------------------------------');
});