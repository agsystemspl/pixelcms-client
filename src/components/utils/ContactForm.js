import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import apiRequest from '~/utils/apiRequest'
import FormHoneypot from '~/components/utils/FormHoneypot'
import validateFormHoneypot from '~/utils/validateFormHoneypot'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class ContactForm extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }
  submit(formData) {
    return apiRequest(
      this.context.store.dispatch, this.context.store.getState,
      'emails/contact-form/',
      {
        method: 'POST',
        body: JSON.stringify(formData)
      }
    )
      .then(({ data, ok, status }) => {
        if (!ok) {
          throw new SubmissionError(
            data || { _error: t(this.context.store.getState(), 'Error occured.') }
          )
        }
      })
  }
  renderTextInput({ input, type, label, meta: { error } }) {
    return (
      <div className={'field' + (error && ' error' || '')}>
        <label htmlFor={input.name}><T t={label} /></label>
        <input id={input.name} {...input} type={type} />
        {error && <div className="error">{error}</div>}
      </div>
    )
  }
  renderTextarea({ input, type, label, meta: { error } }) {
    return (
      <div className={'field' + (error && ' error' || '')}>
        <label htmlFor={input.name}><T t={label} /></label>
        <textarea id={input.name} {...input} />
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
        {this.props.error && <div className="error">{this.props.error}</div>}
        <FormHoneypot />
        <Field name="name" type="text" label="Your name / company name" component={this.renderTextInput} />
        <Field name="email" type="text" label="Email address" component={this.renderTextInput} />
        <Field name="phone" type="text" label="Phone number (optional)" component={this.renderTextInput} />
        <Field name="content" label="Message" component={this.renderTextarea} />
        <div className="btnWrapper">
          <button
            type="submit"
            disabled={this.props.submitting}
            className={this.props.submitting && 'submitting' || null}
          >
            <T t="send" />
          </button>
        </div>
      </form>
    )
  }
}
ContactForm.contextTypes = {
  store: PropTypes.object.isRequired
}
ContactForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired
}

ContactForm = reduxForm({
  form: 'contact',
  validat: validateFormHoneypot
})(ContactForm)

export default ContactForm
