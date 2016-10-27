const express = require('express');
const app = express();
const port = 3500;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ejs = require('ejs');
const jwt = require('jsonwebtoken');

MongoClient.connect('mongodb://localhost:27017/jwt-play', (err, database) => {
  if (err) return console.log(err);
  db = database;

  app.listen(port, () => {
    console.log('listening all the time on', port);
  });
});

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

const templatesDir = __dirname + '/templates/';

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/buildings', (req, res) => {
  db.collection('buildings').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('buildings/index.ejs', {buildings: result});
  });
});

app.get('/buildings/new', (req, res) => {
  res.render('buildings/new.ejs');
});

app.post('/buildings', (req, res) => {
  db.collection('buildings').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('buliding added to db');
  });
  res.redirect('/buildings');
});

app.get('/auth', (req, res) => {
  const token = req.query.token;
  try {
    const decoded = jwt.verify(token, 'whatever', 'HS256');
    const email = decoded.current_user_email;
    res.send('email =' + email);
  } catch (err) {
    res.send('cannot verify authenticity of token');
  }
});
