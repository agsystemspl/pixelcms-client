import React, { PropTypes } from 'react'

import Module from './Module'
import ArticlesModuleArticle from './ArticlesModule/ArticlesModuleArticle'
import AdminLink from '~/components/LiveAdmin/AdminLink'

let ArticlesModule = props => {
  let articles
  if (props.module.data.articles) {
    let items = props.module.data.articles.map((item, key) => {
      return (
        <ArticlesModuleArticle
          key={key}
          articlesTitlesHeadersLevel={props.module.data.articlesTitlesHeadersLevel}
          {...item}
        />
      )
    })
    articles = <div className="articles">{items}</div>
  }
  return (
    <div className={props.getHtmlClassName()} style={{ position: 'relative' }}>
      <AdminLink url={`/admin/content/articlesmodule/${props.module.data.pk}/change/`} />
      <div className="wrapper">
        {props.getHeader()}
        {articles}
      </div>
    </div>
  )
}

ArticlesModule.propTypes = {
  module: PropTypes.shape({
    data: PropTypes.shape({
      pk: PropTypes.number.isRequired,
      articles: PropTypes.array.isRequired,
      articlesTitlesHeadersLevel: PropTypes.string
    }).isRequired
  }).isRequired,
  getHtmlClassName: PropTypes.func.isRequired,
  getHeader: PropTypes.func.isRequired
}

ArticlesModule = Module(
  'articles',
  templateId => `content/articles-module/${templateId}/`,
  'articlesModule'
)(ArticlesModule)

export default ArticlesModule
