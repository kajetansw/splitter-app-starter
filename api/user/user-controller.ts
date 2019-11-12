import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express from 'express';

import userRepository from './user-repository';
import actionRepository from './../action/action-repository';
import statusRepository from './../status/status-repository';
import { API } from '../../api';

const userController = {
  getAll: (
    req: API['/users/all']['GET'],
    res: express.Response
  ) => {
    res.status(200);
    res.send(userRepository.findAll());
  },

  getById: (
    req: API['/user/:id']['GET'],
    res: express.Response
  ) => {
    const user = userRepository.findById(req.params.id);
    if (user) {
      res.status(200);
      res.send(user);
    } else {
      res.status(400);
      res.send({});
    }
  },

  getUserActions: (
    req: API['/user/:id/actions']['GET'],
    res: express.Response
  ) => {
    const actions = actionRepository.findAll();
    const userId = req.params.id;

    if (userRepository.findById(userId)) {
      res.status(200);

      const outputActions = actions
        .filter(action =>
          action.payer === userId || action.debtor === userId
        );

      res.send(outputActions);
    } else {
      res.status(400);
      res.send({ message: 'User not found.' });
    }
  },

  getUserActionsByDate: (
    req: API['/user/:id/actions/by-date']['POST'],
    res: express.Response
  ) => {
    const actions = actionRepository.findAll();
    const userId = req.params.id;
    const dateRange = {
      ...req.body,
      startDate: new Date(Date.parse(req.body.startDate)),
      endDate: new Date(Date.parse(req.body.endDate))
    };

    if (userRepository.findById(userId)) {
      res.status(200);

      const outputActions = actions
        .filter(action =>
          action.payer === userId || action.debtor === userId
        )
        .filter(action =>
          new Date(Date.parse(action.date)) < dateRange.endDate
          && dateRange.startDate < new Date(Date.parse(action.date))
        );

      res.send(outputActions);
    } else {
      res.status(400);
      res.send({ message: 'User not found.' });
    }
  },

  getUserStatuses: (
    req: API['/user/:id/statuses']['GET'],
    res: express.Response
  ) => {
    const statuses = statusRepository.findAll();
    const userId = req.params.id;

    if (userRepository.findById(userId)) {
      res.status(200);

      const outputStatuses = statuses
        .filter(status =>
          status.owner === userId || status.debtor === userId
        );

      res.send(outputStatuses);
    } else {
      res.status(400);
      res.send({ message: 'User not found.' });
    }
  },

  getUserStatusesTexts: (
    req: API['/user/:id/statuses/texts']['GET'],
    res: express.Response
  ) => {
    const statuses = statusRepository.findAll();
    const userId = req.params.id;

    if (userRepository.findById(userId)) {
      res.status(200);

      const outputStatuses = statuses
        .filter(status =>
          status.owner === userId || status.debtor === userId
        )
        .map(status => ({
          ...status,
          owner: userRepository.findById(status.owner),
          debtor: userRepository.findById(status.debtor)
        }))
        .map(status => {
          return userId === status.owner!.id
            ? `You are owned $${status.amount} by ${status.debtor!.name}.`
            : `You own $${status.amount} to ${status.owner!.name}.`;
        });

      res.send(outputStatuses);
    } else {
      res.status(400);
      res.send({ message: 'User not found.' });
    }
  },

  getUserStatusesProfitable: (
    req: API['/user/:id/statuses/profitable']['GET'],
    res: express.Response
  ) => {
    const statuses = statusRepository.findAll();
    const userId = req.params.id;

    if (userRepository.findById(userId)) {
      res.status(200);

      const outputStatuses = statuses
        .filter(status => status.owner === userId);

      res.send(outputStatuses);
    } else {
      res.status(400);
      res.send({ message: 'User not found.' });
    }
  },

  save: (
    req: API['/user']['POST'],
    res: express.Response
  ) => {
    userRepository.save(req.body);
    res.status(200);
    res.send(req.body);
  },

  delete: (
    req: API['/user/:id']['DELETE'],
    res: express.Response
  ) => {
    // TODO delete all actions and status after delete
    const userToDelete = userRepository.findById(req.params.id);
    userRepository.delete(req.params.id);
    res.status(200);
    res.send(userToDelete);
  },

  register: (
    req: API['/register']['POST'],
    res: express.Response
  ) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);
    const user = userRepository.save({ ...req.body, password: hashedPassword });

    const token = jwt.sign(
      { id: user.id },
      'mysecret',
      { expiresIn: 86400 }
    );

    res.status(200);
    res.send({ auth: true, token });
  },

  login: (
    req: API['/login']['POST'],
    res: express.Response
  ) => {
    const user = userRepository.findByEmail(req.body.email);

    if (!user) {
      return res.status(500).send('No user found.');
    }

    const passwordIsValid
      = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign(
      { id: user.id },
      'mysecret',
      { expiresIn: 86400 }
    );

    res.status(200).send({ auth: true, token });
  }
};

export default userController;
