import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'
import EditableContent from '~/components/LiveAdmin/EditableContent'
import AdminLink from '~/components/LiveAdmin/AdminLink'

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
  return (
    <div className="article" style={{ position: 'relative' }}>
      <AdminLink url={`/admin/content/article/${props.pk}/change/`} />
      {header}
      {image}
      {intro}
      {content}
    </div>
  )
}
ArticlesModuleArticle.propTypes = {
  pk: PropTypes.number.isRequired,
  title: PropTypes.string,
  articlesTitlesHeadersLevel: PropTypes.string,
  image: PropTypes.string,
  intro: PropTypes.string,
  content: PropTypes.string,
  route: PropTypes.string
}

export default ArticlesModuleArticle
