import React, { Component, PropTypes } from 'react'
import withRouter from 'react-router/lib/withRouter'
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

class ActivateForm extends Component {
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
      <form
        onSubmit={this.props.handleSubmit(
          () => this.props.activate({key: this.props.params.key})
        )}
      >
        <div className="info">
          <T t="Click button below to activate your account." />
        </div>
        <div style={honeypotStyle}>
          <Field name="yourName" type="text" label="Your name" component={this.renderField} />
        </div>
        <div className="btnWrapper">
          <button
            type="submit"
            disabled={this.props.submitting}
            className={this.props.submitting && 'submitting' || null}
          >
            <T t="Activate" />
          </button>
        </div>
      </form>
    )
  }
}
ActivateForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  activate: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
}

ActivateForm = withRouter(ActivateForm)

ActivateForm = reduxForm({
  form: 'activate',
  validate
})(ActivateForm)

ActivateForm = connect(
  null,
  { activate: authActions.activate }
)(ActivateForm)

export default ActivateForm
