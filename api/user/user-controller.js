const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userRepository = require('./user-repository');
const actionRepository = require('./../action/action-repository');
const statusRepository = require('./../status/status-repository');

const userController = {
  getAll: (req, res) => {
    res.status(200);
    res.send(userRepository.findAll());
  },

  getById: (req, res) => {
    const user = userRepository.findById(req.params.id);
    if (user) {
      res.status(200);
      res.send(user);
    } else {
      res.status(400);
      res.send({});
    }
  },
  
  getUserActions: (req, res) => {
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

  getUserActionsByDate: (req, res) => {
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

  getUserStatuses: (req, res) => {
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

  getUserStatusesTexts: (req, res) => {
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
          return userId === status.owner.id
            ? `You are owned $${status.amount} by ${status.debtor.name}.`
            : `You own $${status.amount} to ${status.owner.name}.`
        });
        
      res.send(outputStatuses);
    } else {
      res.status(400);
      res.send({ message: 'User not found.' });
    }
  },

  getUserStatusesProfitable: (req, res) => {
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

  save: (req, res) => {
    userRepository.save(req.body);
    res.status(200);
    res.send(req.body);
  },

  delete: (req, res) => {
    // TODO delete all actions and status after delete
    const userToDelete = userRepository.findById(req.params.id);
    userRepository.delete(req.params.id);
    res.status(200);
    res.send(userToDelete);
  }
};

module.exports = userController;