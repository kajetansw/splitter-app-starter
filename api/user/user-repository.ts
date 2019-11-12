import { SimpleDb, User } from '../../types';
import JSONdb from 'simple-json-db';
import uuidv4 from 'uuid/v4';

const db: SimpleDb = new JSONdb('./db/users.json');
const users = 'users';

const userRepository = {
  findAll: function(): User[] {
    return db.get(users) || [];
  },

  findById: function(id: string): User | undefined {
    return db.get(users).filter(user => user.id === id).pop();
  },

  findByEmail: function(email: string): User | undefined {
    return db.get(users).filter(user => user.email === email).pop();
  },

  save: function(user: User): User {
    const userToSave = { ...user, id: uuidv4() };
    db.set(users, [
      ...db.get(users),
      userToSave
    ]);
    return userToSave;
  },

  delete: function(id: string): void {
    db.set(
      users,
      db.get(users).filter(user => user.id !== id)
    );
  },

  update: function(user: User): void {
    let userToUpdate = db.get(users)
      .filter(u => u.id === user.id)
      .pop();

    if (!userToUpdate) throw new Error('User does not exist!');

    userToUpdate = { ...userToUpdate, ...user };
    const otherUsers = db.get(users)
      .filter(u => u.id !== userToUpdate!.id);

    db.set(users, [
      ...otherUsers,
      userToUpdate
    ]);
  }
};

export default userRepository;
