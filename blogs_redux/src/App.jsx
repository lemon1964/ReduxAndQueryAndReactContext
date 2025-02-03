import { Routes, Route, useMatch } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import { setLoginstate } from './reducers/loginReducer'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Users from './components/Users'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Blog from './components/Blog'
import Home from './components/Home'
import PrivateRoute from './components/PrivateRoute'
import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: AliceBlue;
`

const Navigation = styled.div`
  background: DeepSkyBlue;
  padding: 1em;
`

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      if (loggedUser.token) {
        try {
          dispatch(setLoginstate(loggedUser))
          blogService.setToken(loggedUser.token)
        } catch (error) {
          console.error('Token is invalid:', error)
          window.localStorage.removeItem('loggedBlogappUser')
          dispatch(setLoginstate(null))
        }
      }
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const user_id =
    userMatch && users
      ? users.find((user) => user.id === userMatch.params.id)
      : null
  const blog =
    blogMatch && blogs
      ? blogs.find((blog) => blog.id === blogMatch.params.id)
      : null

  if (blogs.length === 0 || users.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Page>
      <div className="container">
        <Notification />
        <Navigation>
          {loggedUser ? (
            <Menu user={loggedUser.name} />
          ) : (
            <Togglable buttonLabel="login">
              <LoginForm />
            </Togglable>
          )}
        </Navigation>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/users"
            element={
              <PrivateRoute loggedUser={loggedUser} element={() => <Users />} />
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute
                loggedUser={loggedUser}
                element={() => <User user={user_id} />}
              />
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <PrivateRoute
                loggedUser={loggedUser}
                element={() => <Blog blog={blog} />}
              />
            }
          />
        </Routes>
      </div>
    </Page>
  )
}

export default App
