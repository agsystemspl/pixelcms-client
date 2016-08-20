import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BareLink from 'react-router/lib/Link'

import langPrefix from '~/utils/langPrefix'

class Link extends Component {
  render() {
    let propsToPass = Object.assign({}, this.props)
    delete propsToPass.dispatch
    delete propsToPass.lang

    if (typeof propsToPass.to === 'string') {
      propsToPass.to = langPrefix(propsToPass.to, this.props.lang)
    }
    else {
      propsToPass.to.pathname = langPrefix(propsToPass.to.pathname, this.props.lang)
    }

    return <BareLink {...propsToPass}>{this.props.children}</BareLink>
  }
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

export default Link
