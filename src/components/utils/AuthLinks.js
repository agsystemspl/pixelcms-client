import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import logout from '~/actions/auth/logout'
import Link from './Link'
import T from './T'

let AuthLinks = props => {
  return (
    <div className="authLinks">
      {props.authInfo.user && (
        <div className="loggedIn">
          <div className="hello">
            <T t="Hello" /> <span>{props.authInfo.user}</span>!
          </div>
          <div className="links">
            <span onClick={() => props.logout()}>
              <T t="Logout" />
            </span>
          </div>
        </div>
      ) || (
        <div className="notLoggedIn">
          <div className="links">
            <Link to="/login"><T t="Login" /></Link>
            <Link to="/register"><T t="Register" /></Link>
          </div>
        </div>
      )}
    </div>
  )
}

AuthLinks.propTypes = {
  authInfo: PropTypes.shape({
    user: PropTypes.string,
    isAdmin: PropTypes.bool
  }).isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authInfo: state.auth.authInfo
})
AuthLinks = connect(
  mapStateToProps,
  { logout }
)(AuthLinks)

export default AuthLinks
