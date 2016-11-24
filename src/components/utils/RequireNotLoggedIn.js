import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Redirect from '~/components/utils/Redirect'

const RequiredNotLoggedIn = ComposedComponent => {
  let RequiredNotLoggedIn = props => {
    if (!props.isAuthenticated) {
      return <ComposedComponent {...props} />
    }
    else {
      return <Redirect to="/" />
    }
  }
  RequiredNotLoggedIn.propTypes = {
    isAuthenticated: PropTypes.bool
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.authInfo.isAuthenticated
  })
  return connect(
    mapStateToProps
  )(RequiredNotLoggedIn)
}

export default RequiredNotLoggedIn
