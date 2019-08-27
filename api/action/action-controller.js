const actionRepository = require('./action-repository');
const statusRepository = require('../status/status-repository');

const actionController = {
  getAll: (req, res) => {
    res.status(200);
    res.send(actionRepository.findAll());
  },

  getById: (req, res) => {
    const action = actionRepository.findById(req.params.id);
    if (action) {
      res.status(200);
      res.send(action);
    } else {
      res.status(400);
      res.send({});
    }
  },

  save: (req, res) => {
    const savedAction = actionRepository.save(req.body);
    let statusToUpdate = statusRepository.findAll()
      .filter(status => 
        [status.owner, status.debtor].includes(savedAction.payer) 
        && [status.owner, status.debtor].includes(savedAction.debtor))
      .pop();

    if (!statusToUpdate) {
      statusRepository.save({ 
        amount: savedAction.amount / 2,
        owner: savedAction.payer,
        debtor: savedAction.debtor 
      });
      return res.status(200).send({});
    }

    if (savedAction.payer === statusToUpdate.owner) {
      statusToUpdate.amount += savedAction.amount / 2;
    } else {
      statusToUpdate.amount -= savedAction.amount / 2
    }

    if (statusToUpdate.amount < 0) {
      statusToUpdate = {
        ...statusToUpdate,
        owner: statusToUpdate.debtor,
        debtor: statusToUpdate.owner,
        amount: Math.abs(statusToUpdate.amount)
      };
    }
    
    statusRepository.update(statusToUpdate);

    res.status(200);
    res.send({});
  },

  delete: (req, res) => {
    // TODO calculate status after delete
    const actionToDelete = actionRepository.findById(req.params.id);
    actionRepository.delete(req.params.id);
    res.status(200);
    res.send(actionToDelete);
  }
};

module.exports = actionController;