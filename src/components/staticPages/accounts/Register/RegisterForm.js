import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { auth as authActions } from '~/actions'
import Link from '~/components/utils/Link'
import T from '~/components/utils/T'

const validate = (data) => {
  const errors = {}
  if (data.yourName) {
    errors.yourName = true
  }
  return errors
}

class RegisterForm extends Component {
  renderField({ input, type, label, meta: { error } }) {
    return (
      <div className={'field' + (error && ' error' || '')}>
        <label htmlFor={input.name}><T t={label} /></label>
        <input id={input.name} {...input} type={type} />
        {error && <div className="error">{error}</div>}
      </div>
    )
  }
  render() {
    const honeypotStyle = {
      position: 'absolute',
      left: '-10000px'
    }
    return (
      <form onSubmit={this.props.handleSubmit(this.props.register)}>
        {this.props.error && <div className="error">{this.props.error}</div>}
        <div style={honeypotStyle}>
          <Field name="yourName" type="text" label="Your name" component={this.renderField} />
        </div>
        <Field name="username" type="text" label="Username" component={this.renderField} />
        <Field name="email" type="text" label="Email address" component={this.renderField} />
        <Field name="password" type="password" label="Password" component={this.renderField} />
        <Field name="password2" type="password" label="Repeat password" component={this.renderField} />
        <div className="btnWrapper">
          <button
            type="submit"
            disabled={this.props.submitting}
            className={this.props.submitting && 'submitting' || null}
          >
            <T t="Register" />
          </button>
        </div>
        <div className="links">
          <div>
            <Link to="/login">
              <T t="I already have an account" />
            </Link>
          </div>
        </div>
      </form>
    )
  }
}
RegisterForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired
}

RegisterForm = reduxForm({
  form: 'register',
  validate
})(RegisterForm)

RegisterForm = connect(
  null,
  { register: authActions.register }
)(RegisterForm)

export default RegisterForm
