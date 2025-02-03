import { useRef } from 'react'
import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useCreateNotification } from '../context/NotificationContext'
import { createBlog } from '../services/blogs'
import LoginContext from '../context/LoginContext'
import BlogContext from '../context/BlogContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const blogFormRef = useRef()
  const queryClient = useQueryClient()
  const createNotification = useCreateNotification()
  const [user, Logindispatch] = useContext(LoginContext)
  const [blogs] = useContext(BlogContext)

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      newBlog.user = user
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      queryClient.invalidateQueries(['blogs'])
      createNotification(`you created '${newBlog.title}'`, 'create')
    },
    onError: () => {
      createNotification(
        'Title must be at least 5 characters and unique. Author and url are required. Your token may have expired, please log in again.',
        'error'
      )
    }
  })

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blog)
  }

  if (user) {
    return (
      <div>
        <h2>blogs app</h2>
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlogform={addBlog} />
          </Togglable>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell>{blog.author}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }
}

export default Home
