const express = require('express');
const app = express();
const port = 3500;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log('listening all the time on', port);
});

const templatesDir = __dirname + '/templates/';

app.get('/', (req, res) => {
  res.sendFile(templatesDir + 'index.html');
});

app.get('/buildings/new', (req, res) => {
  res.sendFile(templatesDir + 'buildings/new.html');
});

app.post('/buildings', (req, res) => {
  console.log('hello');
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
