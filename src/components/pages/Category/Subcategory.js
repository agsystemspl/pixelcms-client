import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'
import AdminLink from '~/components/liveAdmin/AdminLink'

const Subcategory = props => (
  <div className="subcategory" style={{ position: 'relative' }}>
    <AdminLink path={`content/category/${props.pk}/change/`} />
    <h2 className="title">
      <Link to={props.route}>
        {props.name}
      </Link>
    </h2>
  </div>
)
Subcategory.propTypes = {
  pk: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Subcategory
