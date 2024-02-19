const { ObjectId } = require('mongodb')
const mongodb = require('../data/database')

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('users').find()
  const users = await result.toArray()
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(users)
}

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id)
    const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId })
    if (user) {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching user', error: error.message })
  }
}

const createUsers = async (req, res) => {
  try {
      const user = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
      };
      
      const response = await mongodb.getDatabase().db().collection("users").insertOne(user);
      if (response.acknowledged) {
        res.status(201).send();
      } else {
        res.status(500).json({ message: 'Error while creating trip', error: response.error || 'Unknown error' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while creating trip', error });
    }
};

const updateUsers = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id)
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
    };

    const response = await mongodb.getDatabase().db().collection("users").replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error while updating trip', error: response.error || 'Unknown error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while updating trip', error });
  }
}

const deleteUsers = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection("users").deleteOne({ _id: userId })
    if (response.deletedCount > 0) {
      res.status(204).send()
    } else {
      res.status(500).json({ message: 'Error while deleting user', error: response.error || 'Unknown error' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while deleting user', error: error.message })
  }
}

module.exports = {
  getAll,
  getSingle,
  createUsers,
  updateUsers,
  deleteUsers,
}