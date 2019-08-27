const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./api/user/user-controller');
const actionController = require('./api/action/action-controller');
const statusController = require('./api/status/status-controller');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// users
app.get('/users/all', userController.getAll);
app.get('/user/:id', userController.getById);
app.get('/user/:id/actions', userController.getUserActions);
app.post('/user/:id/actions/by-date', userController.getUserActionsByDate);
app.get('/user/:id/statuses', userController.getUserStatuses);
app.get('/user/:id/statuses/texts', userController.getUserStatusesTexts);
app.get('/user/:id/statuses/profitable', userController.getUserStatusesProfitable);
app.post('/user', userController.save);
app.delete('/user/:id', userController.delete);

// actions
app.get('/actions/all', actionController.getAll);
app.get('/action/:id', actionController.getById);
app.post('/action', actionController.save);
app.delete('/action/:id', actionController.delete);

// status
app.get('/statuses/all', statusController.getAll);
app.get('/status/:id', statusController.getById);

// auth
// TODO

// start server
app.listen(port, () => {
  console.log(`Server listnening on port ${port}.`);
});