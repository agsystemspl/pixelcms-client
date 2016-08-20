import React, { Component, PropTypes } from 'react'

import Link from '~/components/utils/Link'

class CategoryArticle extends Component {
  render() {
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
      intro = (
        <div
          className="content"
          dangerouslySetInnerHTML={{__html: this.props.content}}
        />
      )
    }
    let image
    if (this.props.image) {
      image = (
        <div className="image">
          <Link to={this.props.route}>
            <img
              src={this.props.image}
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
            <Link to={this.props.route}>
              {this.props.title}
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
