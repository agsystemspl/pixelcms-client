import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import uniqueId from 'lodash/uniqueId'

import t from '~/utils/i18n/t'

let AdminLink = props => {
  /* global __SERVER__ */
  if (__SERVER__ || !props.authInfo.isAdmin || !props.liveAdmin.showAdminLinks) { return null }
  const tooltipId = uniqueId('tooltip')
  return (
    <div>
      <a
        className="adminLink"
        href={props.url}
        target="_blank"
        data-tip={`${t(props.state, 'Go to element in admin panel')}`}
        data-for={tooltipId}
      >
        <i className="fa fa-wrench" />
      </a>
      <ReactTooltip id={tooltipId} effect="solid" />
    </div>
  )
}
AdminLink.propTypes = {
  url: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  authInfo: PropTypes.shape({
    isAdmin: PropTypes.bool
  }).isRequired,
  liveAdmin: PropTypes.shape({
    showAdminLinks: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  state,
  authInfo: state.auth.authInfo,
  liveAdmin: state.liveAdmin
})
AdminLink = connect(
  mapStateToProps
)(AdminLink)

export default AdminLink
