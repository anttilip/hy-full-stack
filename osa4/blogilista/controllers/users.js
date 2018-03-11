const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
      .populate('blogs')
    return response.json(users.map(User.format))
  } catch (err) {
    console.log(err)
    return response.sendStatus(500)
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(User.format(savedUser))
  } catch (err) {
    console.log(err)
    return response.sendStatus(500)
  }
})

module.exports = usersRouter