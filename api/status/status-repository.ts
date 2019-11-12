import { SimpleDb, Status } from '../../types';
import JSONdb from 'simple-json-db';
import uuidv4 from 'uuid/v4';

const db: SimpleDb = new JSONdb('./db/statuses.json');
const statuses = 'statuses';

const statusRepository = {
  findAll: function(): Status[] {
    return db.get(statuses) || [];
  },

  findById: function(id: string): Status {
    return db.get(statuses).filter(status => status.id === id).pop()!;
  },

  save: function(status: Status): Status {
    const statusToSave = { ...status, id: uuidv4() };
    db.set(statuses, [
      ...db.get(statuses),
      statusToSave
    ]);
    return statusToSave;
  },

  delete: function(id: string): void {
    db.set(
      statuses,
      db.get(statuses).filter(status => status.id !== id)
    );
  },

  update: function(status: Status): void {
    let statusToUpdate: Status | undefined = db.get(statuses)
      .filter(s => s.id === status.id)
      .pop();

    if (!statusToUpdate) throw new Error('Status does not exist!');

    statusToUpdate = { ...statusToUpdate, ...status };
    const otherStatuses = db.get(statuses)
      .filter(u => u.id !== statusToUpdate!.id);

    db.set(statuses, [
      ...otherStatuses,
      statusToUpdate
    ]);
  }
};

export default statusRepository;
