import React, { PropTypes } from 'react'
import { Field } from 'redux-form'

const FormHoneypot = props => (
  <div style={{
    position: 'absolute',
    left: '-1000000px',
    zIndex: -1,
    opacity: 0
  }}>
    <Field
      name="yourName"
      type="text"
      label="Your name"
      component={props.component}
    />
  </div>
)
FormHoneypot.propTypes = {
  component: PropTypes.func.isRequired
}

export default FormHoneypot
