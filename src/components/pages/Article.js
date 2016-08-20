import React, { Component, PropTypes } from 'react'

import Link from '~/components/utils/Link'
import Breadcrumbs from '~/components/utils/Breadcrumbs'
import Lightbox from '~/components/utils/Lightbox'
import T from '~/components/utils/T'

class Article extends Component {
  render() {
    let breadcrumbs
    if (this.props.breadcrumbs) {
      breadcrumbs = <Breadcrumbs items={this.props.breadcrumbs} />
    }
    let created
    if (this.props.created) {
      const date = new Date(this.props.created)
      created = (
        <div className="created">
          {date.toLocaleDateString()} @ {date.toLocaleTimeString()}
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
      content = (
        <div
          className="content"
          dangerouslySetInnerHTML={{__html: this.props.content}}
        />
      )
    }
    let images
    if (this.props.images) {
      images = (
        <div className="images">
          <Lightbox items={this.props.images} />
        </div>
      )
    }
    let backLink
    if (this.props.backLink) {
      backLink = (
        <div className="back">
          <Link to={this.props.backLink}><T t="Go back" /></Link>
        </div>
      )
    }
    return (
      <div id="pageArticle">
        <div className="container">
          <div className="wrapper">
            {breadcrumbs}
            <h1 className="title"><span>{this.props.title}</span></h1>
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
