import React, { Component, PropTypes } from 'react'

import Link from '~/components/utils/Link'

class Subcategory extends Component {
  render() {
    return (
      <div className="subcategory">
        <h2 className="title">
          <Link to={this.props.route}>
            {this.props.name}
          </Link>
        </h2>
      </div>
    )
  }
}
Subcategory.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Subcategory
