import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import logout from '~/actions/auth/logout'
import Link from './Link'
import T from './T'

let AuthLinks = props => (
  <div className="authLinks">
    {props.isAuthenticated && (
      <div className="loggedIn">
        <div className="hello">
          <T t="Hello" /> <span>{props.username}</span>!
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
          <Link to="/accounts/login"><T t="Login" /></Link>
          <Link to="/accounts/register"><T t="Register" /></Link>
        </div>
      </div>
    )}
  </div>
)
AuthLinks.propTypes = {
  isAuthenticated: PropTypes.bool,
  username: PropTypes.string,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.authInfo.isAuthenticated,
  username: state.authInfo.user.username
})
AuthLinks = connect(
  mapStateToProps,
  { logout }
)(AuthLinks)

export default AuthLinks
