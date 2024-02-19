const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('destinations')
      .find();
    const destinations = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching destinations', error });
  }
};

const getSingle = async (req, res) => {
  try {
    const destinationId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('destinations')
      .find({ _id: destinationId });
    const destinations = await result.toArray();

    if (destinations.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(destinations[0]);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching destination', error });
  }
};

const createDestinations = async (req, res) => {
  try {
    const destination = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location, // coordinates
      type: req.body.type,
      activities: req.body.activities,
      average_rating: parseFloat(req.body.average_rating), // parse as a float
      review_count: parseInt(req.body.review_count, 10), // parse as an integer
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("destinations")
      .insertOne(destination);

    if (response.acknowledged) {
      res.status(201).send();
    } else {
      res.status(500).json({
        message: 'Error while creating destination',
        error: response.error || 'Unknown error',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while creating destination', error });
  }
};

const updateDestinations = async (req, res) => {
  try {
    const destinationId = new ObjectId(req.params.id);
    const destination = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location, // coordinates
      type: req.body.type,
      activities: req.body.activities,
      average_rating: parseFloat(req.body.average_rating), // parse as a float
      review_count: parseInt(req.body.review_count, 10), // parse as an integer
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("destinations")
      .replaceOne({ _id: destinationId }, destination);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: 'Error while updating destination',
        error: response.error || 'Unknown error',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while updating destination', error });
  }
};

const deleteDestinations = async (req, res) => {
  try {
    const destinationId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("destinations")
      .deleteOne({ _id: destinationId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: 'Error while deleting destination',
        error: response.error || 'Unknown error',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while deleting destination', error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createDestinations,
  updateDestinations,
  deleteDestinations,
};