import React, { PropTypes } from 'react'
import BareLink from 'react-router/lib/Link'
import withRouter from 'react-router/lib/withRouter'

let QueryLink = props => {
  let propsToPass = Object.assign({}, props)
  delete propsToPass.query
  delete propsToPass.router
  delete propsToPass.params
  delete propsToPass.location
  delete propsToPass.routes

  propsToPass.to = {
    pathname: props.location.pathname,
    query: Object.assign({}, props.location.query, props.query)
  }

  return <BareLink {...propsToPass}>{props.children}</BareLink>
}
QueryLink.propTypes = {
  query: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node
}

QueryLink = withRouter(QueryLink)

export default QueryLink
