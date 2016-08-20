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

class LoginForm extends Component {
  renderField({ input, type, label, meta: { error } }) {
    return (
      <div className="field">
        <label htmlFor={input.name}><T t={label} /></label>
        <input id={input.name} {...input} type={type} />
      </div>
    )
  }
  render() {
    const honeypotStyle = {
      position: 'absolute',
      left: '-10000px'
    }
    return (
      <form onSubmit={this.props.handleSubmit(this.props.login)}>
        {this.props.error && <div className="error">{this.props.error}</div>}
        <div style={honeypotStyle}>
          <Field name="yourName" type="text" label="Your name" component={this.renderField} />
        </div>
        <Field name="usernameOrEmail" type="text" label="Username or email" component={this.renderField} />
        <Field name="password" type="password" label="Password" component={this.renderField} />
        <div className="btnWrapper">
          <button
            type="submit"
            disabled={this.props.submitting}
            className={this.props.submitting && 'submitting' || null}
          >
            <T t="Login" />
          </button>
        </div>
        <div className="links">
          <div>
            <Link to="/forgotten-password">
              <T t="I forgot my password" />
            </Link>
          </div>
          <div>
            <Link to="/register">
              <T t="I don't have an account yet" />
            </Link>
          </div>
        </div>
      </form>
    )
  }
}
LoginForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
}

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm)

LoginForm = connect(
  null,
  { login: authActions.login }
)(LoginForm)

export default LoginForm
