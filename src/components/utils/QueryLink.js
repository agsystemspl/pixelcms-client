import React, { Component, PropTypes } from 'react'
import BareLink from 'react-router/lib/Link'
import withRouter from 'react-router/lib/withRouter'

class QueryLink extends Component {
  render() {
    let propsToPass = Object.assign({}, this.props)
    delete propsToPass.query
    delete propsToPass.router
    delete propsToPass.params
    delete propsToPass.location
    delete propsToPass.routes

    propsToPass.to = {
      pathname: this.props.location.pathname,
      query: Object.assign({}, this.props.location.query, this.props.query)
    }

    return <BareLink {...propsToPass}>{this.props.children}</BareLink>
  }
}
QueryLink.propTypes = {
  query: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node
}

QueryLink = withRouter(QueryLink)

export default QueryLink
