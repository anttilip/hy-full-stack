const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs
    .map(blog => blog.likes)
    .reduce((sum, val) => sum + val, 0)
}

const favoriteBlog = blogs => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = blogs => {
  const postCountByAuthor = blogs.reduce((acc, cur) => {
    acc[cur.author] = (acc[cur.author] || 0) + 1
    return acc
  }, {})

  const maxBlogCount = Math.max(...Object.values(postCountByAuthor))
  const author = 
    Object.keys(postCountByAuthor)
    .find(author => postCountByAuthor[author] === maxBlogCount)

  return { author, blogs: maxBlogCount }
}

const mostLikes = blogs => {
  const likeCountByAuthor = blogs.reduce((acc, cur) => {
    acc[cur.author] = (acc[cur.author] || 0) + cur.likes
    return acc
  }, {})

  const maxLikeCount = Math.max(...Object.values(likeCountByAuthor))
  const author = 
    Object.keys(likeCountByAuthor)
    .find(author => likeCountByAuthor[author] === maxLikeCount)

  return { author, likes: maxLikeCount }
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}