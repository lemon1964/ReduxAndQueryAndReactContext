import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { showNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { createBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const loggedUser = useSelector((state) => state.login)
  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const result = await dispatch(createBlog(blogObject))

    if (result.success) {
      dispatch(
        showNotification(
          `A new blog "${result.blog.title}" added`,
          'success',
          5
        )
      )
    } else {
      dispatch(
        showNotification(
          'Title must be at least 5 characters and unique. Author and url are required. Your token may have expired, please log in again.',
          'error',
          5
        )
      )
    }
  }

  if (loggedUser) {
    return (
      <div>
        <br></br>
        <h2>blogs app</h2>
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlogform={addBlog} />
          </Togglable>
          <Table striped>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                  <td>{blog.author}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default Home
