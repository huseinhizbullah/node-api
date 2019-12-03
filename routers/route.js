'use strict'

const userController = require('../controllers/userController')

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.json({ "Test": "Build REST API with node.js" })
    })

    // RESTFUL User Management Routes
    app.route('/users')
        .get(userController.list_all_user)
        .post(userController.create_a_user)

    app.route('/users/:userId')
        .get(userController.get_a_user)
        .put(userController.update_a_user)
        .delete(userController.delete_a_user)

    // //Business Logic API
    app.route('/login')
        .post(userController.login_a_user)

}