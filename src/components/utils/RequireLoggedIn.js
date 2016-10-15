import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'

import langPrefix from '~/utils/langPrefix'

let RequiredLoggedIn = props => {
  if (!props.user) {
    return <Redirect to={langPrefix('/login', props.lang)} />
  }
}
RequiredLoggedIn.propTypes = {
  user: PropTypes.string,
  lang: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.authInfo.user,
  lang: state.route.lang.code
})
RequiredLoggedIn = connect(
  mapStateToProps
)(RequiredLoggedIn)

export default RequiredLoggedIn
