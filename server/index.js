const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Records = require('../schema/records');
const app = express();
const R = require('ramda');

/**
 * DB Connect with mongoose
 */
mongoose.connect(
  'mongodb://blood-sugar:bloodSugar215@ds235708.mlab.com:35708/blood-sugar'
);
var db = mongoose.connection;
db.on(
  'error',
  console.error.bind(console, '[Console] MongoDB connection error:')
); // eslint-disable-line no-console

app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  '/static/css',
  express.static(path.resolve(__dirname, '../build/static/css'))
);
app.use(
  '/static/js',
  express.static(path.resolve(__dirname, '../build/static/js'))
);

/**
 * Server side
 */
app.post('/create', (req, res) => {
  const {
    time_1,
    time_2,
    time_3,
    time_4,
    time_2_content,
    bs_1,
    bs_2,
    bs_3,
    insulin_1,
    insulin_2,
    insulin_3,
    adj_insulin_1,
    adj_insulin_2,
    adj_insulin_3,
    low_bs,
    note
  } = req.body;
  const createRecords = new Records(req.body);
  createRecords.save((err, result) => {
    if (err) {
      res.send({
        status: 'fail',
        msg: 'Create rec fail'
      });
    } else {
      res.send({
        status: 'success',
        msg: 'Create rec success'
      });
    }
  });
});

app.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const postData = R.omit(['_id', '__v'], req.body);
  Records.findById(id, (err, record) => {
    Object.assign(record, postData).save((err, result) => {
      if (err) {
        res.send({
          status: 'fail',
          msg: 'Update rec fail'
        });
      } else {
        res.send({
          status: 'success',
          msg: 'Update rec success'
        });
      }
    });
  });
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  Records.findByIdAndRemove(id, (err, record) => {
    if (err) {
      res.send({
        status: 'fail',
        msg: 'Delete rec fail'
      });
    } else {
      res.send({
        status: 'success',
        msg: 'Delete rec success'
      });
    }
  });
});

app.get('/fetch', (req, res) => {
  let payload = null;
  Records.find((err, result) => {
    if (err) {
      console.log('[Console] Fetch data error -> ', err);
      res.send({
        message: 'fail',
        payload: []
      });
    } else {
      payload = result;
      res.send({
        message: 'success',
        payload
      });
    }
  });
});

/**
 * Other server router for REST API
 */
app.use('*', (req, res) => {
  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    (err, data) => {
      res.status(200).send(data);
    }
  );
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server listening on port ${process.env.PORT || 8080}`)
);
