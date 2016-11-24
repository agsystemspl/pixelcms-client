import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Redirect from '~/components/utils/Redirect'

const RequiredLoggedIn = ComposedComponent => {
  let RequiredLoggedIn = props => {
    if (props.isAuthenticated) {
      return <ComposedComponent {...props} />
    }
    else {
      return <Redirect to="/accounts/login" />
    }
  }
  RequiredLoggedIn.propTypes = {
    isAuthenticated: PropTypes.bool
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.authInfo.isAuthenticated
  })
  return connect(
    mapStateToProps
  )(RequiredLoggedIn)
}

export default RequiredLoggedIn
