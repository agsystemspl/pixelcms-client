import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'

const Subcategory = props => (
  <div className="subcategory">
    <h2 className="title">
      <Link to={props.route}>
        {props.name}
      </Link>
    </h2>
  </div>
)
Subcategory.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Subcategory
