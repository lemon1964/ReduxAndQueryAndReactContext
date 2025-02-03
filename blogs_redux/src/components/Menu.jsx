import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginstate } from '../reducers/loginReducer'

const Menu = () => {
  const loggedUser = useSelector((state) => state.login)
  const dispatch = useDispatch()

  if (!loggedUser) {
    return <div>Loading data...</div>
  }

  const padding = {
    paddingRight: 5,
    paddingLeft: 5,
    color: 'white',
    fontSize: 20
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <em style={padding}>{loggedUser.name} logged in</em>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  window.localStorage.removeItem('loggedBlogappUser')
                  dispatch(setLoginstate(null))
                }}
              >
                logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu
