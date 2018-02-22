const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const api = supertest(app)

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

    const blogs = await Blog.find({})
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

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
]

beforeAll(async () => {
  await Blog.remove({})

  initialBlogs.forEach(async blog => await new Blog(blog).save())

})

afterAll(() => {
  server.close()
})