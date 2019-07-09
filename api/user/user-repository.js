const JSONdb = require('simple-json-db');
const db = new JSONdb('./db/users.json');
const uuidv4 = require('uuid/v4');

const users = 'users';

const userRepository = {
  findAll: function() {
    return db.get(users) || [];
  },

  findById: function(id) {
    return db.get(users).filter(user => user.id == id).pop();
  },

  findByEmail: function(email) {
    return db.get(users).filter(user => user.email === email).pop();
  },

  save: function(user) {
    const userToSave = { ...user, id: uuidv4() };
    db.set(users, [
      ...db.get(users),
      userToSave
    ]);
    return userToSave;
  },

  delete: function(id) {
    db.set(
      users, 
      db.get(users).filter(user => user.id != id)
    );
  },

  update: function(user) {
    let userToUpdate = db.get(users)
      .filter(u => u.id === user.id)
      .pop();

    if (!userToUpdate) throw new Error('User does not exist!');

    userToUpdate = { ...userToUpdate, ...user };
    const otherUsers = db.get(users).filter(u => u.id !== userToUpdate.id);

    db.set(users, [
      ...otherUsers,
      userToUpdate
    ]);
  }
};

module.exports = userRepository;