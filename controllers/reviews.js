const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');



const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('reviews').find();
    const reviews = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(reviews);
};

const getSingle = async (req, res) => {
    try {
      const reviewId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().db().collection('reviews').find({ _id: reviewId });
      const reviews = await result.toArray();
      if (reviews.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(reviews[0]);
      } else {
        res.status(404).json({ message: 'Reviews not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while fetching reviews', error });
    }
};

const createReviews = async (req, res) => {
  try {
    const review = {
      user_id: req.body.user_id,
      destination_id: req.body.destination_id,
      rating: req.body.rating,
      comment: req.body.comment,
      created_at: req.body.created_at,
    };

    const response = await mongodb.getDatabase().db().collection("reviews").insertOne(review);
    if (response.acknowledged) {
      res.status(201).send();
    } else {
      res.status(500).json({ message: 'Error while creating review', error: response.error || 'Unknown error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while creating review', error });
  }
};

const deleteReview = async (req, res) => {
    try {
      const reviewId = new ObjectId(req.params.id);
      const response = await mongodb.getDatabase().db().collection("reviews").deleteOne({ _id: reviewId });
      if (response.deleteCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: 'Error while deleting review', error: response.error || 'Unknown error' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while deleting review', error });
    }
};

module.exports = {
    getAll,
    getSingle,
    createReviews,
    deleteReview,
};
