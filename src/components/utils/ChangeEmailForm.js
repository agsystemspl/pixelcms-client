import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import apiRequest from '~/utils/apiRequest'
import FormHoneypot from '~/components/utils/FormHoneypot'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class ChangeEmailForm extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
    this.renderTextInput = this.renderTextInput.bind(this)
  }
  submit(formData) {
    return apiRequest(
      this.context.store.dispatch, this.context.store.getState,
      'accounts/change-email/',
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
        <Field name="newEmail" type="text" label="New email" component={this.renderTextInput} />
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
ChangeEmailForm.contextTypes = {
  store: PropTypes.object.isRequired
}
ChangeEmailForm.defaultProps = {
  placeholders: false
}
ChangeEmailForm.propTypes = {
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

ChangeEmailForm = reduxForm({
  form: 'changeEmail'
})(ChangeEmailForm)

export default ChangeEmailForm
