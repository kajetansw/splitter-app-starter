const JSONdb = require('simple-json-db');
const db = new JSONdb('./db/actions.json');
const uuidv4 = require('uuid/v4');

const actions = 'actions';

const actionRepository = {
  findAll: function() {
    return db.get(actions) || [];
  },

  findById: function(id) {
    return db.get(actions).filter(action => action.id == id).pop();
  },

  save: function(action) {
    const actionToSave = { 
      ...action, 
      date: new Date().toUTCString(), 
      id: uuidv4() 
    };
    
    db.set(actions, [
      ...db.get(actions),
      actionToSave
    ]);
    return actionToSave;
  },

  delete: function(id) {
    db.set(
      actions, 
      db.get(actions).filter(action => action.id != id)
    );
  },

  update: function(action) {
    let actionToUpdate = db.get(actions)
      .filter(a => a.id === action.id)
      .pop();

    if (!actionToUpdate) throw new Error('Action does not exist!');

    actionToUpdate = { ...actionToUpdate, ...action };
    const otherActions = db.get(actions)
      .filter(a => a.id !== actionToUpdate.id);

    db.set(actions, [
      ...otherActions,
      actionToUpdate
    ]);
  }
};

module.exports = actionRepository;