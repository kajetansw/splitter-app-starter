const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// start here

// start server
app.listen(port, () => {
  console.log(`Server listnening on port ${port}.`);
});