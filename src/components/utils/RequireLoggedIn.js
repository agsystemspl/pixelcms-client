import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'

import langPrefix from '~/utils/langPrefix'

const RequiredLoggedIn = ComposedComponent => {
  let RequiredLoggedIn = props => {
    if (props.isAuthenticated) {
      return <ComposedComponent {...props} />
    }
    else {
      return <Redirect to={langPrefix('/accounts/login', props.lang)} />
    }
  }
  RequiredLoggedIn.propTypes = {
    isAuthenticated: PropTypes.bool,
    lang: PropTypes.shape({
      code: PropTypes.string.isRequired,
      default: PropTypes.bool.isRequired
    }).isRequired
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.authInfo.isAuthenticated,
    lang: state.route.lang
  })
  return connect(
    mapStateToProps
  )(RequiredLoggedIn)
}

export default RequiredLoggedIn
