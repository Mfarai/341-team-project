const express = require('express')
const router = express.Router()

const userController = require('../controllers/users');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle)

router.post('/', userController.createUsers)

router.put('/:id', userController.updateUsers)

router.delete('/:id', userController.deleteUsers)

module.exports = router