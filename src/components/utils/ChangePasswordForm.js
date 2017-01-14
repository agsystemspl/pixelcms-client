import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import apiRequest from '~/utils/apiRequest'
import FormHoneypot from '~/components/utils/FormHoneypot'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class ChangePasswordForm extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
    this.renderTextInput = this.renderTextInput.bind(this)
  }
  submit(formData) {
    return apiRequest(
      this.context.store.dispatch, this.context.store.getState,
      'accounts/change-password/',
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
  renderTextInput({ input, type, label, meta: { error } }) {
    return (
      <div className={'field' + (error && ' error' || '')}>
        {!this.props.placeholders && <label htmlFor={input.name}><T t={label} /></label>}
        {!this.props.placeholders &&
          <input id={input.name} {...input} type={type} /> ||
          <input id={input.name} placeholder={t(this.context.store.getState(), label)} {...input} type={type} />}
        {error && <div className="error">{error}</div>}
      </div>
    )
  }
  render() {
    if (this.props.submitSucceeded) {
      return (
        <div className="success">
          <div className="msg">
            <T t="Thank you, your message has been sent!" />
          </div>
          <button className="reset" onClick={() => this.props.reset()}>
            <T t="Send new message" />
          </button>
        </div>
      )
    }
    return (
      <form onSubmit={this.props.handleSubmit(this.submit)}>
        <FormHoneypot />
        <Field name="currentPassword" type="password" label="Current password" component={this.renderTextInput} />
        <Field name="newPassword" type="password" label="New password" component={this.renderTextInput} />
        <Field name="newPassword2" type="password" label="Repeat new password" component={this.renderTextInput} />
        <div className="btnWrapper">
          <button
            type="submit"
            disabled={this.props.submitting}
            className={this.props.submitting && 'submitting' || null}
          >
            <T t="Change" />
          </button>
        </div>
        {this.props.error && <div className="error">{this.props.error}</div>}
      </form>
    )
  }
}
ChangePasswordForm.contextTypes = {
  store: PropTypes.object.isRequired
}
ChangePasswordForm.defaultProps = {
  placeholders: false
}
ChangePasswordForm.propTypes = {
  placeholders: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired
}

ChangePasswordForm = reduxForm({
  form: 'changePassword'
})(ChangePasswordForm)

export default ChangePasswordForm
