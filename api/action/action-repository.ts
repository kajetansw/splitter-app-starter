import { SimpleDb, Action } from '../../types';
import JSONdb from 'simple-json-db';
import uuidv4 from 'uuid/v4';

const db: SimpleDb = new JSONdb('./db/actions.json');
const actions = 'actions';

const actionRepository = {
  findAll: function() {
    return db.get(actions) || [];
  },

  findById: function(id: string): Action | undefined {
    return db.get(actions).filter(action => action.id === id).pop();
  },

  save: function(action: Action): Action {
    const actionToSave: Action = {
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

  delete: function(id: string): void {
    db.set(
      actions,
      db.get(actions).filter(action => action.id !== id)
    );
  },

  update: function(action: Action) {
    let actionToUpdate = db.get(actions)
      .filter(a => a.id === action.id)
      .pop();

    if (!actionToUpdate) throw new Error('Action does not exist!');

    actionToUpdate = { ...actionToUpdate, ...action };
    const otherActions = db.get(actions)
      .filter(a => a.id !== actionToUpdate!.id);

    db.set(actions, [
      ...otherActions,
      actionToUpdate
    ]);
  }
};

export default actionRepository;
