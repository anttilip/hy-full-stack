const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const {
  initialBlogs,
  format,
  nonExistingId,
  blogsInDb
} = require('./test_helper')
const api = supertest(app)

beforeAll(async () => {
  await Blog.remove({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjects.map(b => b.save()))
})

afterAll(() => {
  server.close()
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('POST /api/blogs', () => {
  test('returns 201', async () => {
    const body = { title: "Test123", author: "Me", url: "http://test.com", likes: 123 }
    await api
      .post('/api/blogs')
      .send(body)
      .expect(201)
  })

  test('sets likes to 0 if none was given', async () => {
    const body = { title: "withoutLikes", author: "Me", url: "http://test.com" }
    await api
      .post('/api/blogs')
      .send(body)

    const blogs = await blogsInDb()
    const matching = blogs.find(blog => blog.title === body.title)

    expect(matching).not.toBeNull()
    expect(matching.likes).toBe(0)
  })

  test('returns 400 if title is not sent', async () => {
    const body = { author: "no-title", url: "http://test.com", likes: 123 }
    await api
      .post('/api/blogs')
      .send(body)
      .expect(400)
  })

  test('returns 400 if url is not sent', async () => {
    const body = { title: "no-url", author: "Me" }
    await api
      .post('/api/blogs')
      .send(body)
      .expect(400)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('returns 200', async () => {
    const blogsBefore = await blogsInDb()
    const blogToDelete = blogsBefore[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(200)
    
    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    const blogIds = blogsAfter.map(blog => blog.id)
    expect(blogIds).not.toContain(blogToDelete.id)
  })

  test('returns 404 if id doesnt exist', async () => {
    const invalidId = await nonExistingId()
    const blogsBefore = await blogsInDb()

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(404)
    
    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('returns 200', async () => {
    const blogsBefore = await blogsInDb()
    const blogToEdit = blogsBefore[0]
    blogToEdit.title = 'edited-title'

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(blogToEdit)
      .expect(200)
    
    const editedBlog = await Blog.findById(blogToEdit.id)
    expect(editedBlog.title).toBe(blogToEdit.title)
  })

  test('returns 404 if id doesnt exist', async () => {
    const invalidId = await nonExistingId()

    await api
      .put(`/api/blogs/${invalidId}`)
      .expect(404)
  })
})