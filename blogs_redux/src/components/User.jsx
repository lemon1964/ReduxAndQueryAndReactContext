import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) {
    return <div>Loading user data...</div>
  }

  const sortedBlogs = [...user.blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <br />
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ListGroup>
        {sortedBlogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
