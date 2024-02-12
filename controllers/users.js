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
    const { name, surname, phone, email, username } = req.body
    if (!name || !surname || !phone || !email || !username) {
      res.status(400).json({ message: 'Missing required fields' })
      return
    }

    const user = { name, surname, phone, email, username }
    const response = await mongodb.getDatabase().db().collection("users").insertOne(user)
    if (response.acknowledged && response.insertedCount > 0) {
      res.status(201).json({ message: 'User created', id: response.insertedId })
    } else {
      res.status(500).json({ message: 'Error while creating user', error: response.error || 'Unknown error' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while creating user', error: error.message })
  }
}

const updateUsers = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id)
    const { name, surname, phone, email, username } = req.body
    if (!name || !surname || !phone || !email || !username) {
      res.status(400).json({ message: 'Missing required fields' })
      return
    }

    const user = { name, surname, phone, email, username }
    const response = await mongodb.getDatabase().db().collection("users").replaceOne({ _id: userId }, user)
    if (response.matchedCount > 0 && response.modifiedCount > 0) {
      res.status(204).send()
    } else {
      res.status(500).json({ message: 'Error while updating user', error: response.error || 'Unknown error' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while updating user', error: error.message })
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