import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  Togglable.displayName = 'Togglable'

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility} size="sm">
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="primary" onClick={toggleVisibility} size="sm">
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
