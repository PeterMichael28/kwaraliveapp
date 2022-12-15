import React from 'react'
import Alert from 'react-bootstrap/Alert';

const AlertMsg = ({message}) => {
  return (
      <div>
          <Alert variant='success'>
          {message}
        </Alert>
    </div>
  )
}

export default AlertMsg