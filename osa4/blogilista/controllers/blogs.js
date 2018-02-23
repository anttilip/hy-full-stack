const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    return response.json(blogs)
  } catch (err) {
    console.log(err)
    return response.sendStatus(500)
  }
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  body.likes = body.likes || 0

  if (!body.title || !body.url) {
    response.sendStatus(400)
  }

  const blog = new Blog(body)

  try {
    const result = await blog.save()
    return response.status(201).json(result)
  } catch (err) {
    console.log(err)
    return response.sendStatus(500)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findOneAndRemove({ _id: request.params.id })

    if (blog) {
      return response.sendStatus(200)
    } else {
      return response.sendStatus(404)
    }
  } catch (err) {
    console.log(err)
    return response.sendStatus(500)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    const blog = await Blog.findByIdAndUpdate(request.params.id, body, {new: true})

    if (!blog) response.sendStatus(404)

    response.status(200).json(blog)

  } catch (err) {
    console.log(err)
    return response.sendStatus(500)
  }
})
  

module.exports = blogsRouter