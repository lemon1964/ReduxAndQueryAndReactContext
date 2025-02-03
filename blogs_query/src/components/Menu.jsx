import { Link } from 'react-router-dom'
import LoginContext from '../context/LoginContext'
import { useContext } from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = () => {
  const [user, Logindispatch] = useContext(LoginContext)

  if (!user) {
    return <div>Loading data...</div>
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <em style={{ color: 'lightgray' }}>{user.name} logged in</em>
        <Button
          color="inherit"
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser')
            Logindispatch({ type: 'LOGOUT' })
          }}
          component={Link}
          to="/"
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
