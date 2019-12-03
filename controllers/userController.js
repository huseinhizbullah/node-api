'use strict'
const model = require('../models');
const bcrypt = require('bcryptjs')

//list all users
exports.list_all_user = async (req, res) => {
    try {
        await model.User.findAll().then(
            (result) => {
                res.json({
                    'status': 'OK',
                    'messages': 'list-all-users',
                    'data': result
                })
            }
        )
    } catch (error) {
        res.json({
            'status': 'ERROR',
            'messages': error.messages,
            'data': {}
        })
    }
}

//get a user by id
exports.get_a_user = async (req, res) => {

    try {
        const usersId = req.params.userId;

        await model.User.findByPk(usersId)
            .then((result) => {
                res.json({
                    'status': 'OK',
                    'messages': 'list-a-users',
                    'data': result
                })
            })

    } catch (error) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': error.message,
            'data': {},
        })
    }
}

//create a user
exports.create_a_user = async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body

        const hash = bcrypt.hashSync(password, 10)

        const user = await model.User.create({
            firstName,
            lastName,
            email,
            password: hash
        })

        if (user) {
            res.status(201).json({
                'status': 'OK',
                'messages': 'create-a-user',
                'data': user,
            })
        }

    } catch (error) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': error.message,
            'data': {},
        })
    }
}

//update a user by id
exports.update_a_user = async (req, res) => {

    try {

        const userId = req.params.userId;

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body

        const users = await model.User.update({
            firstName,
            lastName,
            email,
            password
        }, {
            where: {
                id: userId
            }
        })

        if (users) {
            res.json({
                'status': 'OK',
                'messages': 'update-a-user',
                'data': users,
            })
        }

    } catch (error) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': error.message,
            'data': {},
        })
    }

}

//delete a user by id
exports.delete_a_user = async (req, res) => {

    try {

        const usersId = req.params.userId;

        await model.User.destroy({
            where: {
                id: usersId
            }
        }).then((result) => {
            if (result) {
                res.json({
                    'status': 'OK',
                    'messages': 'delete a user',
                })
            } else {
                res.json({
                    'status': 'ERROR',
                    'messages': 'user not found',
                })
            }
        })


    } catch (error) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': error.message,
            'data': {},
        })
    }
}

//check the password towards the hashed password stored in db
exports.login_a_user = async (req, res) => {

    const {
        email,
        password
    } = req.body

    try {
        await model.User.findOne({ where: { email: email } })
            .then((result) => {
                if (result) {
                    if (bcrypt.compareSync(password, result.password)) {
                        res.json({
                            'status': 'OK',
                            'messages': 'Credentials match',
                            'data': result
                        })
                    } else {
                        res.json({
                            'status': 'ERROR',
                            'messages': 'Credentials not valid'
                        })
                    }
                } else {
                    res.json({
                        'status': 'ERROR',
                        'messages': 'Credentials not valid',
                    })
                }
            })

    } catch (error) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': error.message,
            'data': {},
        })
    }

}