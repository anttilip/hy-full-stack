const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1 })
    return response.json(blogs)
  } catch (err) {
    console.log(err)
    return response.sendStatus(500)
  }
})
  
blogsRouter.post('/', async (request, response) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const body = request.body
    body.likes = body.likes || 0

    if (!body.title || !body.url) {
      response.sendStatus(400)
    }

    const user = await User.findById(body.userId)
    body.user = user._id
    const blog = new Blog(body)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return response.status(201).json(savedBlog)
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