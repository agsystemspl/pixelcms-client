import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import BareRedirect from 'react-router/Redirect'

import langPrefix from '~/utils/langPrefix'

let Redirect = props => {
  let propsToPass = Object.assign({}, props)
  delete propsToPass.dispatch
  delete propsToPass.lang

  if (typeof propsToPass.to === 'string') {
    propsToPass.to = langPrefix(propsToPass.to, props.lang)
  }
  else {
    propsToPass.to.pathname = langPrefix(propsToPass.to.pathname, props.lang)
  }

  return <BareRedirect {...propsToPass}>{props.children}</BareRedirect>
}
Redirect.propTypes = {
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
Redirect = connect(mapStateToProps)(Redirect)

export default Redirect
