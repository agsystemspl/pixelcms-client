import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import uniqueId from 'lodash/uniqueId'

import t from '~/utils/i18n/t'

let AdminLink = props => {
  /* global __SERVER__ */
  if (__SERVER__ || !props.isAdmin || !props.liveAdmin.showAdminLinks) { return null }
  const tooltipId = uniqueId('tooltip')
  return (
    <div>
      <a
        className="adminLink"
        /* global __ADMIN_ROOT__ */
        href={`${__ADMIN_ROOT__}${props.path}`}
        target="_blank"
        data-tip={`${t(props.state, 'Go to element in admin panel')}`}
        data-for={tooltipId}
      >
        <i className="material-icons">build</i>
      </a>
      <ReactTooltip id={tooltipId} effect="solid" />
    </div>
  )
}
AdminLink.propTypes = {
  path: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  liveAdmin: PropTypes.shape({
    showAdminLinks: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  state,
  isAdmin: state.authInfo.user.isAdmin,
  liveAdmin: state.liveAdmin
})
AdminLink = connect(
  mapStateToProps
)(AdminLink)

export default AdminLink
