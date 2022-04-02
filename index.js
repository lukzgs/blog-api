const express = require('express');
// const bodyParser = require('body-parser');
const routes = require('./routes/Routes');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('Localhost port: 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', routes);