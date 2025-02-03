import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { update, remove, createComment } from '../services/blogs'
import { useCreateNotification } from '../context/NotificationContext'
import styled from 'styled-components'
import { List, ListItem, Typography, Button as MuiButton } from '@mui/material'

const Button = styled(MuiButton)`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Blog = ({ loggedUser, blog }) => {
  const queryClient = useQueryClient()
  const createNotification = useCreateNotification()
  const navigate = useNavigate()

  const deleteBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: (_, id) => {
      const deletedBlog = queryClient
        .getQueryData(['blogs'])
        .find((blog) => blog.id === id)
      queryClient.setQueryData(['blogs'], (blogs) =>
        blogs.filter((blog) => blog.id !== id)
      )
      queryClient.invalidateQueries(['blogs'])
      createNotification(
        `Blog '${deletedBlog.title}' deleted successfully`,
        'delete'
      )
    },
    onError: () => {
      createNotification('Error deleting blog', 'error')
    }
  })

  const updatedBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (blogs) =>
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
      queryClient.invalidateQueries(['blogs'])
      createNotification(`Blog '${updatedBlog.title}' liked`, 'like')
    },
    onError: () => {
      createNotification('Error updating blog', 'error')
    }
  })

  const NewCommentMutation = useMutation({
    mutationFn: ({ id, newComment }) => createComment(id, newComment),
    onSuccess: (newComment) => {
      queryClient.setQueryData(['blogs'], (blogs) =>
        blogs.map((blog) =>
          blog.id === newComment.blog
            ? { ...blog, comments: blog.comments.concat(newComment) }
            : blog
        )
      )
      queryClient.invalidateQueries(['blogs'])
      createNotification('Comment added', 'create')
    },
    onError: () => {
      createNotification('Error adding comment', 'error')
    }
  })

  if (!loggedUser) {
    return null
  }

  if (!blog) {
    return <div>Loading data...</div>
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    }
    await updatedBlogMutation.mutate({ id: blog.id, ...updatedBlog })
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlogMutation.mutate(blog.id)
      navigate('/')
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    const newComment = { content }
    NewCommentMutation.mutate({ id: blog.id, newComment })
    event.target.comment.value = ''
  }

  const showRemoveButton =
    loggedUser && blog.user && blog.user.username === loggedUser.username

  return (
    <div>
      <Typography variant="h4" component="h2">
        {blog.title} by {blog.author}
      </Typography>
      <div>
        <Link to={blog.url}>{blog.url}</Link>
      </div>
      <div>
        {blog.likes} likes
        <Button onClick={handleLike}>like</Button>
      </div>
      <div>added by {blog.user ? blog.user.name : 'unknown'}</div>
      {showRemoveButton && (
        <Button color="error" onClick={handleRemove}>
          remove
        </Button>
      )}
      <form onSubmit={handleComment}>
        <Typography variant="h6" component="h3">
          Add Comment
        </Typography>
        <Input placeholder="comment" name="comment" />
        <Button type="submit">add comment</Button>
      </form>
      <Typography variant="h6" component="h3">
        Comments
      </Typography>
      <List>
        {blog.comments.length > 0 && blog.comments[0].content ? (
          blog.comments.map((comment) => (
            <ListItem key={comment.id}>{comment.content}</ListItem>
          ))
        ) : (
          <Typography>No comments yet.</Typography>
        )}
      </List>
    </div>
  )
}

export default Blog
