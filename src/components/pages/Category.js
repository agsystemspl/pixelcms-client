import React, { Component, PropTypes } from 'react'

import Link from '~/components/utils/Link'
import Breadcrumbs from '~/components/utils/Breadcrumbs'
import Subcategory from './Category/Subcategory'
import CategoryArticle from './Category/CategoryArticle'
import Pagination from '~/components/utils/Pagination'
import T from '~/components/utils/T'

class Category extends Component {
  render() {
    let breadcrumbs
    if (this.props.breadcrumbs) {
      breadcrumbs = <Breadcrumbs items={this.props.breadcrumbs} />
    }
    let description
    if (this.props.description) {
      description = (
        <div
          className="description"
          dangerouslySetInnerHTML={{__html: this.props.description}}
        />
      )
    }
    let subcategories
    if (this.props.subcategories) {
      let items = this.props.subcategories.map((item, key) => {
        return <Subcategory key={key} {...item} />
      })
      subcategories = <div className="subcategories">{items}</div>
    }
    let articles
    if (this.props.articles) {
      let items = this.props.articles.map((item, key) => {
        return <CategoryArticle key={key} {...item} />
      })
      articles = <div className="articles">{items}</div>
    }
    let pagination
    if (this.props.pagination) {
      pagination = <Pagination {...this.props.pagination} />
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
      <div id="pageCategory">
        <div className="container">
          <div className="wrapper">
            {breadcrumbs}
            <div className="categoryHeader">
              <div className="titleWrapper">
                <h1 className="title"><span>{this.props.name}</span></h1>
              </div>
              {description}
            </div>
            {subcategories}
            {articles}
            {pagination}
            {backLink}
          </div>
        </div>
      </div>
    )
  }
}
Category.propTypes = {
  breadcrumbs: PropTypes.array,
  description: PropTypes.string,
  subcategories: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  backLink: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default Category
