import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { auth as authActions } from '~/actions'
import T from '~/components/utils/T'

const validate = (data) => {
  const errors = {}
  if (data.yourName) {
    errors.yourName = true
  }
  return errors
}

class ResendActivationMessageForm extends Component {
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
      <form onSubmit={this.props.handleSubmit(this.props.resendActivationMessage)}>
        {this.props.error && <div className="error">{this.props.error}</div>}
        <div style={honeypotStyle}>
          <Field name="yourName" type="text" label="Your name" component={this.renderField} />
        </div>
        <Field name="email" type="text" label="Email address" component={this.renderField} />
        <div className="btnWrapper">
          <button
            type="submit"
            disabled={this.props.submitting}
            className={this.props.submitting && 'submitting' || null}
          >
            <T t="Send" />
          </button>
        </div>
      </form>
    )
  }
}
ResendActivationMessageForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  resendActivationMessage: PropTypes.func.isRequired
}

ResendActivationMessageForm = reduxForm({
  form: 'resendActivationMessage',
  validate
})(ResendActivationMessageForm)

ResendActivationMessageForm = connect(
  null,
  { resendActivationMessage: authActions.resendActivationMessage }
)(ResendActivationMessageForm)

export default ResendActivationMessageForm
