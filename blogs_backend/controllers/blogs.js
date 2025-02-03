const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1
  })
  response.status(201).json(populatedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1
  })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'token invalid' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
)

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const savedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  response.status(200).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { content } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  const comment = new Comment({
    content: content,
    blog: blog._id
  })

  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  const populatedBlog = await Blog.findById(blog._id)
    .populate('comments', { content: 1 })
    .populate('user', { username: 1, name: 1 })

  response.status(201).json(populatedBlog)
})

module.exports = blogsRouter
