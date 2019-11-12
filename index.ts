import express from 'express';
import bodyParser from 'body-parser';
import { Application } from './types';

import userController from './api/user/user-controller';
import actionController from './api/action/action-controller';
import statusController from './api/status/status-controller';

const app: Application = express();
const port = 3000;

app.use(bodyParser.json());

// users
app.get('/users/all', userController.getAll);
app.get('/user/:id', userController.getById);
app.delete('/user/:id', userController.delete);
app.get('/user/:id/actions', userController.getUserActions);
app.post('/user/:id/actions/by-date', userController.getUserActionsByDate);
app.get('/user/:id/statuses', userController.getUserStatuses);
app.get('/user/:id/statuses/texts', userController.getUserStatusesTexts);
app.get('/user/:id/statuses/profitable', userController.getUserStatusesProfitable);
app.post('/user', userController.save);

// actions
app.get('/actions/all', actionController.getAll);
app.get('/action/:id', actionController.getById);
app.delete('/action/:id', actionController.delete);
app.post('/action', actionController.save);

// status
app.get('/statuses/all', statusController.getAll);
app.get('/status/:id', statusController.getById);

// auth
app.post('/login', userController.login);
app.post('/register', userController.register);

// start server
app.listen(port, () => {
  console.log(`Server listnening on port ${port}.`);
});
