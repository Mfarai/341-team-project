const express = require('express')
const router = express.Router()

const userController = require('../controllers/destination');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle)

router.post('/', userController.createDestinations)

router.put('/:id', userController.updateDestinations)

router.delete('/:id', userController.deleteDestinations)

module.exports = router