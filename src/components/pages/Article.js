import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'
import Breadcrumbs from '~/components/utils/Breadcrumbs'
import Lightbox from '~/components/utils/Lightbox'
import T from '~/components/utils/T'

const Article = props => {
  let breadcrumbs
  if (props.breadcrumbs) {
    breadcrumbs = <Breadcrumbs items={props.breadcrumbs} />
  }
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
    content = (
      <div
        className="content"
        dangerouslySetInnerHTML={{__html: props.content}}
      />
    )
  }
  let images
  if (props.images) {
    images = (
      <div className="images">
        <Lightbox items={props.images} />
      </div>
    )
  }
  let backLink
  if (props.backLink) {
    backLink = (
      <div className="back">
        <Link to={props.backLink}><T t="Go back" /></Link>
      </div>
    )
  }
  return (
    <div id="pageArticle">
      <div className="container">
        <div className="wrapper">
          {breadcrumbs}
          <h1 className="title"><span>{props.title}</span></h1>
          {created}
          {intro}
          {content}
          {images}
          {backLink}
        </div>
      </div>
    </div>
  )
}
Article.propTypes = {
  breadcrumbs: PropTypes.array,
  created: PropTypes.string,
  intro: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  backLink: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default Article
