import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import apiRequest from '~/utils/apiRequest'
import FormHoneypot from '~/components/utils/FormHoneypot'
import validateFormHoneypot from '~/utils/validateFormHoneypot'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class RegisterForm extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }
  submit(formData) {
    return apiRequest(
      this.context.store.dispatch, this.context.store.getState,
      'accounts/register/',
      {
        method: 'POST',
        body: JSON.stringify(formData)
      }
    )
      .then(({ data, ok, status }) => {
        if (ok) {
          return data
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
      <div className={'field' + (error && ' error' || '')}>
        <label htmlFor={input.name}><T t={label} /></label>
        <input id={input.name} {...input} type={type} />
        {error && <div className="error">{error}</div>}
      </div>
    )
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.submit)}>
        {this.props.error && <div className="error">{this.props.error}</div>}
        <FormHoneypot />
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
      </form>
    )
  }
}
RegisterForm.contextTypes = {
  store: PropTypes.object.isRequired
}
RegisterForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

RegisterForm = reduxForm({
  form: 'register',
  validate: validateFormHoneypot
})(RegisterForm)

export default RegisterForm
