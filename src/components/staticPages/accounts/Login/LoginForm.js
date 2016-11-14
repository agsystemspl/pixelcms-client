import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'

import apiRequest from '~/utils/apiRequest'
import authenticated from '~/actions/auth/authenticated'
import addToast from '~/actions/toaster/addToast'
import FormHoneypot from '~/components/utils/FormHoneypot'
import validateFormHoneypot from '~/utils/validateFormHoneypot'
import t from '~/utils/i18n/t'
import T from '~/components/utils/T'

class LoginForm extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }
  submit(formData) {
    return apiRequest(
      this.context.store.dispatch, this.context.store.getState,
      'accounts/login/',
      {
        method: 'POST',
        body: JSON.stringify(formData)
      }
    )
      .then(({ data, ok, status }) => {
        if (ok) {
          this.props.authenticated(data.authInfo.token, data.authInfo.user)
          this.props.addToast('success', data.msg, null)
        }
        else {
          throw new SubmissionError(
            data || { _error: t(this.context.store.getState(), 'Error occured.') }
          )
        }
      })
  }
  renderField({ input, type, label, meta: { error } }) {
    return (
      <div className="field">
        <label htmlFor={input.name}><T t={label} /></label>
        <input id={input.name} {...input} type={type} />
      </div>
    )
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.submit)}>
        {this.props.error && <div className="error">{this.props.error}</div>}
        <FormHoneypot component={this.renderField} />
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
      </form>
    )
  }
}
LoginForm.contextTypes = {
  store: PropTypes.object.isRequired
}
LoginForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  authenticated: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
}

LoginForm = reduxForm({
  form: 'login',
  validate: validateFormHoneypot
})(LoginForm)

LoginForm = connect(
  null,
  {
    authenticated,
    addToast
  }
)(LoginForm)

export default LoginForm
