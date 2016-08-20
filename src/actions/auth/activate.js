import { SubmissionError } from 'redux-form'

import ApiRequest from '~/utils/ApiRequest'
import t from '~/utils/i18n/t'

const activate = (data) => (dispatch, getState) => {
  return new ApiRequest().post('accounts/activate/', dispatch, getState, { data })
    .then(
      (res) => {
        return res.body
      },
      (res) => {
        let errors
        if (res.body) { errors = { ...res.body } }
        else { errors = {_error: t(getState(), 'Error occured.')} }
        throw new SubmissionError(errors)
      }
    )
}

export default activate
