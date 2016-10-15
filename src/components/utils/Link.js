import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import BareLink from 'react-router/Link'

import langPrefix from '~/utils/langPrefix'

let Link = props => {
  let propsToPass = Object.assign({}, props)
  delete propsToPass.dispatch
  delete propsToPass.lang

  if (typeof propsToPass.to === 'string') {
    propsToPass.to = langPrefix(propsToPass.to, props.lang)
  }
  else {
    propsToPass.to.pathname = langPrefix(propsToPass.to.pathname, props.lang)
  }

  return <BareLink {...propsToPass}>{props.children}</BareLink>
}
Link.propTypes = {
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.node
}

const mapStateToProps = (state) => ({
  lang: state.route.lang
})
Link = connect(mapStateToProps)(Link)

export default BareLink
