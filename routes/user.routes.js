
const express = require('express');
const userController = require('../controllers/user.controllers');

const router = express.Router();

router.
    route('/').
    get(userController.getAllUser).
    post(userController.createUser);

router.
    route('/:userId').
    get(userController.getUser).
    patch(userController.updateUser).
    delete(userController.deleteUser);

module.exports = router;