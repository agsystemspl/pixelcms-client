import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Link from './Link'

let Breadcrumbs = props => {
  if (props.path === '/') { return null }
  let items = props.items.map((item, i) => {
    if (i < props.items.length - 1) {
      return (
        <span key={i}>
          <i className="arrow fa fa-angle-right" />
          <Link to={item.route}><span>{item.name}</span></Link>
        </span>
      )
    }
    else {
      return (
        <span key={i} className="active">
          <i className="arrow fa fa-angle-right" />
          <span>{item.name}</span>
        </span>
      )
    }
  })
  return (
    <div id="breadcrumbs">
      <span className="home">
        <Link to="/"><i className="fa fa-home" /></Link>
      </span>
      {items}
    </div>
  )
}
Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  path: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  path: state.route.path
})
Breadcrumbs = connect(
  mapStateToProps
)(Breadcrumbs)

export default Breadcrumbs
