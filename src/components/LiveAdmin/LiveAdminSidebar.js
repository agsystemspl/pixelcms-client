import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cookie from 'react-cookie'
import ReactTooltip from 'react-tooltip'

import toggleMarkEditableContent from '~/actions/liveAdmin/toggleMarkEditableContent'
import toggleShowAdminLinks from '~/actions/liveAdmin/toggleShowAdminLinks'
import logout from '~/actions/auth/logout'
import t from '~/utils/i18n/t'

class LiveAdminSidebar extends Component {
  componentDidMount() {
    if (this.props.authInfo.isAdmin) {
      if (cookie.load('liveAdminMarkEditableContent') && !this.props.liveAdmin.markEditableContent) {
        this.props.toggleMarkEditableContent(false)
      }
      if (cookie.load('liveAdminShowAdminLinks') && !this.props.liveAdmin.showAdminLinks) {
        this.props.toggleShowAdminLinks(false)
      }
    }
  }
  render() {
    if (!this.props.authInfo.isAdmin) { return null }
    return (
      <div id="liveAdminSidebar">
        <div
          className={`icon ${this.props.liveAdmin.markEditableContent && 'active'}`}
          data-tip={`${t(this.props.state, 'Mark editable content')}`}
          data-for="liveAdminSidebar"
          onClick={() => this.props.toggleMarkEditableContent()}
        >
          <i className="material-icons">content_paste</i>
        </div>
        <div
          className={`icon ${this.props.liveAdmin.showAdminLinks && 'active'}`}
          data-tip={`${t(this.props.state, 'Show admin links')}`}
          data-for="liveAdminSidebar"
          onClick={() => this.props.toggleShowAdminLinks()}
        >
          <i className="material-icons">visibility</i>
        </div>
        <a
          className="icon"
          href="/admin/"
          target="_blank"
          data-tip={`${t(this.props.state, 'Go to admin panel')}`}
          data-for="liveAdminSidebar"
        >
          <i className="material-icons">build</i>
        </a>
        <div
          className="icon"
          data-tip={`${t(this.props.state, 'Logout')}`}
          data-for="liveAdminSidebar"
          onClick={() => this.props.logout()}
        >
          <i className="material-icons">lock_outline</i>
        </div>
        <ReactTooltip id="liveAdminSidebar" effect="solid" />
      </div>
    )
  }
}

LiveAdminSidebar.propTypes = {
  state: PropTypes.object.isRequired,
  authInfo: PropTypes.shape({
    isAdmin: PropTypes.bool
  }).isRequired,
  liveAdmin: PropTypes.shape({
    markEditableContent: PropTypes.bool.isRequired,
    showAdminLinks: PropTypes.bool.isRequired
  }).isRequired,
  toggleMarkEditableContent: PropTypes.func.isRequired,
  toggleShowAdminLinks: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  state,
  authInfo: state.auth.authInfo,
  liveAdmin: state.liveAdmin
})
LiveAdminSidebar = connect(
  mapStateToProps,
  { toggleMarkEditableContent, toggleShowAdminLinks, logout }
)(LiveAdminSidebar)

export default LiveAdminSidebar
