const express = require('express')
const router = express.Router()

const userController = require('../controllers/trips');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle)

router.post('/', userController.createTrips)

router.put('/:id', userController.updateTrips)

router.delete('/:id', userController.deleteTrips)

module.exports = router