const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('users').find();
  const users = await result.toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(users);
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    const users = await result.toArray();
    if (users.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
    } else {
      res.status(404).json({ message: 'Friend not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching friend', error });
  }
};

const createUsers = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
      color: req.body.color,
      city: req.body.city,
      ipaddress: req.body.ipaddress,
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).send();
    } else {
      res.status(500).json({ message: 'Error while creating friend', error: response.error || 'Unknown error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while creating friend', error });
  }
};

const updateUsers = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
      color: req.body.color,
      city: req.body.city,
      ipaddress: req.body.ipaddress,
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error while updating friend', error: response.error || 'Unknown error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while updating friend', error });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
    if (response.deleteCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error while deleting friend', error: response.error || 'Unknown error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while deleting friend', error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUsers,
  updateUsers,
  deleteUsers,
};