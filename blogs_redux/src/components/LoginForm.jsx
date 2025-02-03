import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setLoginstate } from '../reducers/loginReducer'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      showNotification(
        'Read and create blogs, like for the best ones. Please log in',
        'common',
        5
      )
    )
  }, [dispatch])

  const creatUser = async (userObject) => {
    try {
      const loggedUser = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      dispatch(setLoginstate(loggedUser))
      dispatch(showNotification(`Welcome ${loggedUser.name}`, 'success', 5))
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 'error', 5))
    }
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    creatUser({
      username,
      password
    })
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" size="sm">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
