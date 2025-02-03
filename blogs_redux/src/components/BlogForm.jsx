import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlogform }) => {
  const loggedUser = useSelector((state) => state.login)

  const addBlog = (event) => {
    event.preventDefault()
    const content = event.target.blogTitle.value
    const author = event.target.blogAuthor.value
    const url = event.target.blogUrl.value

    createBlogform({
      title: content,
      author,
      url,
      likes: 0,
      user: { username: loggedUser.username, name: loggedUser.name }
    })
    event.target.blogTitle.value = ''
    event.target.blogAuthor.value = ''
    event.target.blogUrl.value = ''
  }

  return (
    <div>
      <br></br>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Control placeholder="title" name="blogTitle" />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="author" name="blogAuthor" />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="url" name="blogUrl" type="url" />
          <Button
            variant="primary"
            type="submit"
            className="button_remove"
            size="sm"
          >
            create
          </Button>
        </Form.Group>
      </Form>
      <br></br>
    </div>
  )
}

BlogForm.propTypes = {
  createBlogform: PropTypes.func.isRequired
}

export default BlogForm
