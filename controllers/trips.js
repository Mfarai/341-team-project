const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('trips').find();
  const trips = await result.toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(trips);
};

const getSingle = async (req, res) => {
    try {
      const tripsId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().db().collection('trips').find({ _id: tripsId });
      const trips = await result.toArray();
      if (users.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(trips[0]);
      } else {
        res.status(404).json({ message: 'Friend not trip' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while fetching trip', error });
    }
};

const createTrips = async (req, res) => {
    try {
      const trip = {
        user_id: req.body.user_id,
        destinations: req.body.destinations,
        startDate: req.Date,
        endDate: req.Date,
        createdAt: req.body.createdAt,
        budget: req.body.budget,
      };
      
      const response = await mongodb.getDatabase().db().collection("trips").insertOne(trip);
      if (response.acknowledged) {
        res.status(201).send();
      } else {
        res.status(500).json({ message: 'Error while creating trip', error: response.error || 'Unknown error' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while creating trip', error });
    }
};

const updateTrips = async (req, res) => {
    try {
      const tripId = new ObjectId(req.params.id);
      const trip = {
        user_id: req.body.user_id,
        destinations: req.body.destinations,
        startDate: req.Date,
        endDate: req.Date,
        createdAt: req.body.createdAt,
        budget: req.body.budget,
      };
  
      const response = await mongodb.getDatabase().db().collection("trips").replaceOne({ _id: tripId }, trip);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: 'Error while updating trip', error: response.error || 'Unknown error' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while updating trip', error });
    }
};

const deleteTrips = async (req, res) => {
    try {
      const tripId = new ObjectId(req.params.id);
      const response = await mongodb.getDatabase().db().collection("trips").deleteOne({ _id: tripId });
      if (response.deleteCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: 'Error while deleting trip', error: response.error || 'Unknown error' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while deleting trip', error });
    }
  };

module.exports = {
    getAll,
    getSingle,
    createTrips,
    updateTrips,
    deleteTrips,
};