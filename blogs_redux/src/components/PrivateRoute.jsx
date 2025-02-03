import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ element, loggedUser }) => {
  return loggedUser ? element() : <Navigate to="/" />
}

export default PrivateRoute
