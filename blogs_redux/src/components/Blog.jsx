import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import {
  deleteBlog,
  updateExistingBlog,
  addComment
} from '../reducers/blogReducer'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.login)

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    }
    const result = await dispatch(updateExistingBlog(blog.id, updatedBlog))

    if (result.success) {
      dispatch(showNotification(`Blog ${blog.title} liked`, 'success', 5))
    } else {
      dispatch(
        showNotification(
          result.error || 'Failed to update the blog',
          'error',
          5
        )
      )
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    const newComment = { content }
    const result = await dispatch(addComment(blog.id, newComment))

    if (result.success) {
      dispatch(showNotification('Comment added', 'success', 5))
    } else {
      dispatch(showNotification('Error adding comment', 'error', 5))
    }

    event.target.comment.value = ''
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const result = await dispatch(deleteBlog(blog.id))
      navigate('/')
      if (result.success) {
        dispatch(showNotification(`Blog ${blog.title} removed`, 'delete', 5))
      } else {
        dispatch(
          showNotification(
            result.error || 'Failed to remove the blog',
            'error',
            5
          )
        )
      }
    }
  }

  if (!blog) {
    return null
  }

  const showRemoveButton =
    loggedUser && blog.user && blog.user.username === loggedUser.username

  return (
    <div className="container">
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <Link to={blog.url}>{blog.url}</Link>
      </div>
      <div className="likes">
        {blog.likes} likes
        <Button variant="primary" onClick={handleLike} size="sm">
          Like
        </Button>
      </div>
      <div>added by {blog.user ? blog.user.name : 'unknown'}</div>
      {showRemoveButton && (
        <Button variant="danger" onClick={handleRemove} size="sm">
          Remove
        </Button>
      )}
      <br />
      <Form onSubmit={handleComment}>
        <h3>Add Comment</h3>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Control
            type="text"
            placeholder="Enter your comment"
            name="comment"
          />
        </Form.Group>
        <Button variant="success" type="submit" size="sm">
          Add Comment
        </Button>
      </Form>
      <h3>Comments</h3>
      <ListGroup>
        {blog.comments.length > 0 && blog.comments[0].content ? (
          blog.comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </ListGroup>
    </div>
  )
}

export default Blog
