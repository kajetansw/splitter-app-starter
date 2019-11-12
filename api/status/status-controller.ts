import { API } from '../../api';
import express from 'express';

const statusRepository = require('./status-repository');

const statusController = {
  getAll: (
    req: API['/statuses/all']['GET'],
    res: express.Response
  ) => {
    res.status(200);
    res.send(statusRepository.findAll());
  },

  getById: (
    req: API['/status/:id']['GET'],
    res: express.Response
  ) => {
    const status = statusRepository.findById(req.params.id);
    if (status) {
      res.status(200);
      res.send(status);
    } else {
      res.status(400);
      res.send({});
    }
  }
};

export default statusController;
