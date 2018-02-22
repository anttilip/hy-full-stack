const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
  const body = request.body
  body.likes = body.likes || 0

  if (!body.title || !body.url) {
    response.sendStatus(400)
  }

  const blog = new Blog(body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
  

module.exports = blogsRouter