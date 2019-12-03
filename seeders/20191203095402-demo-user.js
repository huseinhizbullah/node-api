'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@demo.com',
      password: bcrypt.hashSync('my-password', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'John',
      lastName: 'Tor',
      email: 'tor@demo.com',
      password: bcrypt.hashSync('my-password', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});

  },

  down: (queryInterface, Sequelize) => {

  }
};
