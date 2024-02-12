const express = require('express')
const router = express.Router()

const userController = require('../controllers/reviews');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle)

router.post('/', userController.createReviews)

router.delete('/:id', userController.deleteReview)

module.exports = router