const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
    .populate('blog', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const { content, blogId } = request.body

  const blog = await Blog.findById(blogId)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  const comment = new Comment({
    content,
    blog: blog._id
  })

  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

commentsRouter.delete('/:id', async (request, response) => {
  await Comment.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = commentsRouter
