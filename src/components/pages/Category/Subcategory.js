import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'
import EditableContent from '~/components/liveAdmin/EditableContent'
import AdminLink from '~/components/liveAdmin/AdminLink'

const Subcategory = props => (
  <div className="subcategory" style={{ position: 'relative' }}>
    <AdminLink path={`content/category/${props.pk}/change/`} />
    <h2 className="title">
      <Link to={props.route}>
        {props.name}
      </Link>
    </h2>
    {props.image && (
      <div className="image">
        <Link to={props.route}>
          <img
            src={props.image}
            alt=""
          />
        </Link>
      </div>
    )}
    {props.description && (
      <div className="description">
        <EditableContent
          model="cms.content.models.Category"
          pk={props.pk}
          field="description"
          content={props.description}
        />
      </div>
    )}
  </div>
)
Subcategory.propTypes = {
  pk: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string
}

export default Subcategory
