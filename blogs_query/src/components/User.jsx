import { Link } from 'react-router-dom'
import { List, ListItem, Typography } from '@mui/material'

const User = ({ loggedUser, user }) => {
  if (!loggedUser) {
    return null
  }

  if (!user) {
    return <div>Loading user data...</div>
  }

  return (
    <div>
      <Typography variant="h4" component="h2">
        {user.name}
      </Typography>
      <Typography variant="h5" component="h3">
        Added Blogs
      </Typography>
      <List>
        {user.blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <ListItem key={blog.id} style={{ paddingLeft: 0 }}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListItem>
          ))}
      </List>
    </div>
  )
}

export default User
