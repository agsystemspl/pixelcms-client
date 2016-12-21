import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Link from './Link'

let Breadcrumbs = props => {
  if (props.path === '/') { return null }
  return (
    <div id="breadcrumbs">
      <span className="homeWrapper">
        <Link to="/">
          <span className="home" />
        </Link>
      </span>
      {props.items.map((item, key) => (
        <span key={key} className={`item ${key === props.items.length - 1 && 'active' || ''}`}>
          <span className="separator" />
          {key < props.items.length - 1 && (
            <Link to={item.route}><span>{item.name}</span></Link>
          ) || (
            <span>{item.name}</span>
          )}
        </span>
      ))}
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

const mapStateToProps = state => ({
  path: state.route.path
})
Breadcrumbs = connect(
  mapStateToProps
)(Breadcrumbs)

export default Breadcrumbs
