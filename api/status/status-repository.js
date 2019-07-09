const JSONdb = require('simple-json-db');
const db = new JSONdb('./db/statuses.json');
const uuidv4 = require('uuid/v4');

const statuses = 'statuses';

const statusRepository = {
  findAll: function() {
    return db.get(statuses) || [];
  },

  findById: function(id) {
    return db.get(statuses).filter(status => status.id == id).pop();
  },

  save: function(status) {
    const statusToSave = { ...status, id: uuidv4() };
    db.set(statuses, [
      ...db.get(statuses),
      statusToSave
    ]);
    return statusToSave;
  },

  delete: function(id) {
    db.set(
      statuses, 
      db.get(statuses).filter(status => status.id != id)
    );
  },

  update: function(status) {
    let statusToUpdate = db.get(statuses)
      .filter(s => s.id === status.id)
      .pop();

    if (!statusToUpdate) throw new Error('Status does not exist!');

    statusToUpdate = { ...statusToUpdate, ...status };
    const otherStatuses = db.get(statuses).filter(u => u.id !== statusToUpdate.id);

    db.set(statuses, [
      ...otherStatuses,
      statusToUpdate
    ]);
  }
};

module.exports = statusRepository;