import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'
import EditableContent from '~/components/LiveAdmin/EditableContent'
import AdminLink from '~/components/LiveAdmin/AdminLink'

const CategoryArticle = props => {
  let created
  if (props.created) {
    const date = new Date(props.created)
    created = (
      <div className="created">
        {date.toLocaleDateString()} @ {date.toLocaleTimeString()}
      </div>
    )
  }
  let intro
  if (props.intro) {
    intro = (
      <div className="intro">
        <EditableContent
          model="cms.content.models.Article"
          pk={props.pk}
          field="intro"
          content={props.intro}
        />
      </div>
    )
  }
  let content
  if (props.content) {
    intro = (
      <div className="content">
        <EditableContent
          model="cms.content.models.Article"
          pk={props.pk}
          field="content"
          content={props.content}
        />
      </div>
    )
  }
  let image
  if (props.image) {
    image = (
      <div className="image">
        <Link to={props.route}>
          <img
            src={props.image}
            alt=""
          />
        </Link>
      </div>
    )
  }
  return (
    <div className="article" style={{ position: 'relative' }}>
      <AdminLink url={`/admin/content/article/${props.pk}/change/`} />
      <h2 className="title">
        <span>
          <Link to={props.route}>
            {props.title}
          </Link>
        </span>
      </h2>
      {created}
      {image}
      {intro}
      {content}
    </div>
  )
}
CategoryArticle.propTypes = {
  pk: PropTypes.number.isRequired,
  created: PropTypes.string,
  intro: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default CategoryArticle
