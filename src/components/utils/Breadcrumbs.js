import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Link from './Link'

let Breadcrumbs = props => {
  if (props.path === '/') { return null }
  return (
    <div id="breadcrumbs">
      <span className="item home">
        <Link to="/">
          <span>Home</span>
        </Link>
      </span>
      {props.items.map((item, key) => {
        const active = key === props.items.length - 1
        return (
          <span key={key}>
            <span className="separator" />
            <span className={`item ${active && 'active' || ''}`}>
              {!active && (
                <Link to={item.route}><span>{item.name}</span></Link>
              ) || (
                <span>{item.name}</span>
              )}
            </span>
          </span>
        )
      })}
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
