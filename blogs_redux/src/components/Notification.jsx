import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  const style = {
    background:
      notification.type === 'success'
        ? 'lightgreen'
        : notification.type === 'error'
          ? 'lightpink'
          : notification.type === 'info'
            ? 'lightblue'
            : notification.type === 'delete'
              ? 'lightyellow'
              : 'lightgray',
    padding: '1rem',
    margin: '-1rem'
  }

  return (
    <div className="notification-wrapper notification-enter">
      <div className="notification-background" style={style}>
        {notification.message && (
          <Alert variant="success">{notification.message}</Alert>
        )}
      </div>
    </div>
  )
}

export default Notification
