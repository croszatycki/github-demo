const express = require('express');
const bodyParser = require('body-parser');
const routesRepository = require('./routes/repository');

// Defining the Port Variable
const port = process.env.PORT || 5000;

// Set up the express app
const app = express();

// parse request body content
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routesRepository);

app.get('*', (req, res) =>
  res.status(404).send({
    message: 'What are you searching for?',
  })
);

const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
