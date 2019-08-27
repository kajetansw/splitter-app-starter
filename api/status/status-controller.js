const statusRepository = require('./status-repository');

const statusController = {
  getAll: (req, res) => {
    res.status(200);
    res.send(statusRepository.findAll());
  },

  getById: (req, res) => {
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

module.exports = statusController;