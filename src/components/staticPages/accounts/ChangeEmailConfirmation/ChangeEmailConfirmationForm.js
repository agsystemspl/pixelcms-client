import React, { Component, PropTypes } from 'react'
import { reduxForm, SubmissionError } from 'redux-form'

import apiRequest from '~/utils/apiRequest'
import FormHoneypot from '~/components/utils/FormHoneypot'
import validateFormHoneypot from '~/utils/validateFormHoneypot'
import t from '~/utils/i18n/t'
import T from '~/components/utils/T'

class ChangeEmailConfirmationForm extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }
  submit(formData) {
    return apiRequest(
      this.context.store.dispatch, this.context.store.getState,
      'accounts/change-email-confirmation/',
      {
        method: 'POST',
        body: JSON.stringify({
          key: this.props.confirmationKey
        })
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
        <div className="info">
          <T t="Click button below to change your email." />
        </div>
        <FormHoneypot />
        <div className="btnWrapper">
          <button
            type="submit"
            disabled={this.props.submitting}
            className={this.props.submitting && 'submitting' || null}
          >
            <T t="Change" />
          </button>
        </div>
      </form>
    )
  }
}
ChangeEmailConfirmationForm.contextTypes = {
  store: PropTypes.object.isRequired
}
ChangeEmailConfirmationForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  confirmationKey: PropTypes.string.isRequired
}

ChangeEmailConfirmationForm = reduxForm({
  form: 'changeEmailConfirmation',
  validate: validateFormHoneypot
})(ChangeEmailConfirmationForm)

export default ChangeEmailConfirmationForm
