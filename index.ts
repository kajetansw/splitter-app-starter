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
app.get('/api/users/all', userController.getAll);
app.get('/api/user/:id', userController.getById);
app.delete('/api/user/:id', userController.delete);
app.get('/api/user/:id/actions', userController.getUserActions);
app.post('/api/user/:id/actions/by-date', userController.getUserActionsByDate);
app.get('/api/user/:id/statuses', userController.getUserStatuses);
app.get('/api/user/:id/statuses/texts', userController.getUserStatusesTexts);
app.get('/api/user/:id/statuses/profitable', userController.getUserStatusesProfitable);
app.post('/api/user', userController.save);

// actions
app.get('/api/actions/all', actionController.getAll);
app.get('/api/action/:id', actionController.getById);
app.delete('/api/action/:id', actionController.delete);
app.post('/api/action', actionController.save);

// status
app.get('/api/statuses/all', statusController.getAll);
app.get('/api/status/:id', statusController.getById);

// auth
app.post('/api/login', userController.login);
app.post('/api/register', userController.register);

// start server
app.listen(port, () => {
  console.log(`Server listnening on port ${port}.`);
});
