import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.users)

  if (!users) {
    return <div>Loading users...</div>
  }

  if (users.length === 0) {
    return <div>No users found.</div>
  }

  return (
    <div>
      <br></br>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}> {user.name} </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
