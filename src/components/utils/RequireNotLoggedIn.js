import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'

import langPrefix from '~/utils/langPrefix'

const RequiredNotLoggedIn = ComposedComponent => {
  let RequiredNotLoggedIn = props => {
    if (!props.isAuthenticated) {
      return <ComposedComponent {...props} />
    }
    else {
      return <Redirect to={langPrefix('/', props.lang)} />
    }
  }
  RequiredNotLoggedIn.propTypes = {
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
  )(RequiredNotLoggedIn)
}

export default RequiredNotLoggedIn
