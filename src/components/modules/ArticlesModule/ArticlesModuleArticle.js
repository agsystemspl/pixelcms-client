import React, { Component, PropTypes } from 'react'

import Link from '~/components/utils/Link'

class ArticlesModuleArticle extends Component {
  render() {
    let header
    if (this.props.title) {
      const ArticleHeader = `h${this.props.articlesTitlesHeadersLevel}`
      let title
      if (this.props.route) {
        title = (
          <Link to={this.props.route}>
            {this.props.title}
          </Link>
        )
      }
      else {
        title = this.props.title
      }
      header = (
        <ArticleHeader className="title">
          {title}
        </ArticleHeader>
      )
    }
    let image
    if (this.props.image) {
      let img
      if (this.props.route) {
        img = (
          <Link to={this.props.route}>
            <img src={this.props.image} alt="" />
          </Link>
        )
      }
      else {
        img = <img src={this.props.image} alt="" />
      }
      image = (
        <div className="image">
          {img}
        </div>
      )
    }
    let intro
    if (this.props.intro) {
      intro = (
        <div
          className="intro"
          dangerouslySetInnerHTML={{__html: this.props.intro}}
        />
      )
    }
    let content
    if (this.props.content) {
      intro = (
        <div
          className="content"
          dangerouslySetInnerHTML={{__html: this.props.content}}
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
