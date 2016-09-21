import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'

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
      <div
        className="intro"
        dangerouslySetInnerHTML={{__html: props.intro}}
      />
    )
  }
  let content
  if (props.content) {
    intro = (
      <div
        className="content"
        dangerouslySetInnerHTML={{__html: props.content}}
      />
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
    <div className="article">
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
  created: PropTypes.string,
  intro: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default CategoryArticle
