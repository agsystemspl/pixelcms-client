import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'
import EditableContent from '~/components/liveAdmin/EditableContent'
import AdminLink from '~/components/liveAdmin/AdminLink'

const CategoriesModuleCategory = props => {
  let header
  if (props.name) {
    const CategoryHeader = `h${props.namesHeadersLevel}`
    let name
    if (props.route) {
      name = (
        <Link to={props.route}>
          {props.name}
        </Link>
      )
    }
    else {
      name = props.name
    }
    header = (
      <CategoryHeader className="title">
        {name}
      </CategoryHeader>
    )
  }
  let description
  if (props.description) {
    description = (
      <div className="description">
        <EditableContent
          model="cms.content.models.Category"
          pk={props.pk}
          field="description"
          content={props.description}
        />
      </div>
    )
  }
  let image
  if (props.image) {
    let img
    if (props.route) {
      img = (
        <Link to={props.route}>
          <img src={props.image} alt="" />
        </Link>
      )
    }
    else {
      img = <img src={props.image} alt="" />
    }
    image = (
      <div className="image">
        {img}
      </div>
    )
  }
  return (
    <div className="category" style={{ position: 'relative' }}>
      <AdminLink path={`content/category/${props.pk}/change/`} />
      {header}
      {description}
      {image}
    </div>
  )
}
CategoriesModuleCategory.propTypes = {
  pk: PropTypes.number.isRequired,
  name: PropTypes.string,
  namesHeadersLevel: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  route: PropTypes.string
}

export default CategoriesModuleCategory
