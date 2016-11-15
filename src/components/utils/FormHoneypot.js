import React from 'react'
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
      placeholder="Your name"
      component="input"
    />
  </div>
)

export default FormHoneypot
