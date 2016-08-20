import React, { Component, PropTypes } from 'react'

import Module from './Module'
import ArticlesModuleArticle from './ArticlesModule/ArticlesModuleArticle'

class ArticlesModule extends Component {
  render() {
    let articles
    if (this.props.module.data.articles) {
      let items = this.props.module.data.articles.map((item, key) => {
        return (
          <ArticlesModuleArticle
            key={key}
            articlesTitlesHeadersLevel={this.props.module.data.articlesTitlesHeadersLevel}
            {...item}
          />
        )
      })
      articles = <div className="articles">{items}</div>
    }
    return (
      <div className={this.props.getHtmlClassName()}>
        <div className="wrapper">
          {this.props.getHeader()}
          {articles}
        </div>
      </div>
    )
  }
}
ArticlesModule.moduleType = 'articles'
ArticlesModule.getApiPath = (templateId) => 'content/articles-module/' + templateId + '/'
ArticlesModule.moduleTypeHtmlClass = 'articlesModule'

ArticlesModule.propTypes = {
  module: PropTypes.shape({
    data: PropTypes.shape({
      articles: PropTypes.array.isRequired,
      articlesTitlesHeadersLevel: PropTypes.string
    }).isRequired
  }).isRequired,
  getHtmlClassName: PropTypes.func.isRequired,
  getHeader: PropTypes.func.isRequired
}

ArticlesModule = Module(ArticlesModule)

export default ArticlesModule
