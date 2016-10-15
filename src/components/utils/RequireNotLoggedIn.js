import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'

import langPrefix from '~/utils/langPrefix'

let RequiredNotLoggedIn = props => {
  return props.user ? <Redirect to={langPrefix('/', props.lang)} /> : null
}
RequiredNotLoggedIn.propTypes = {
  user: PropTypes.string,
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  user: state.auth.authInfo.user,
  lang: state.route.lang
})
RequiredNotLoggedIn = connect(
  mapStateToProps
)(RequiredNotLoggedIn)

export default RequiredNotLoggedIn
