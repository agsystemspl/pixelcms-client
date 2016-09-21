import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'

const ArticlesModuleArticle = props => {
  let header
  if (props.title) {
    const ArticleHeader = `h${props.articlesTitlesHeadersLevel}`
    let title
    if (props.route) {
      title = (
        <Link to={props.route}>
          {props.title}
        </Link>
      )
    }
    else {
      title = props.title
    }
    header = (
      <ArticleHeader className="title">
        {title}
      </ArticleHeader>
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
  return (
    <div className="article">
      {header}
      {image}
      {intro}
      {content}
    </div>
  )
}
ArticlesModuleArticle.propTypes = {
  title: PropTypes.string,
  articlesTitlesHeadersLevel: PropTypes.string,
  image: PropTypes.string,
  intro: PropTypes.string,
  content: PropTypes.string,
  route: PropTypes.string
}

export default ArticlesModuleArticle
