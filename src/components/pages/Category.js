import React, { PropTypes } from 'react'

import Link from '~/components/utils/Link'
import Breadcrumbs from '~/components/utils/Breadcrumbs'
import Subcategory from './Category/Subcategory'
import CategoryArticle from './Category/CategoryArticle'
import Pagination from '~/components/utils/Pagination'
import T from '~/components/utils/T'
import EditableContent from '~/components/LiveAdmin/EditableContent'
import AdminLink from '~/components/LiveAdmin/AdminLink'

const Category = props => {
  let breadcrumbs
  if (props.breadcrumbs) {
    breadcrumbs = <Breadcrumbs items={props.breadcrumbs} />
  }
  let description
  if (props.description) {
    description = (
      <div className="description">
        <EditableContent
          model="cms.content.models.Category"
          pk={props.pk}
          field="description"
          content={props.description}
        />
      </div>
    )
  }
  let subcategories
  if (props.subcategories) {
    let items = props.subcategories.map((item, key) => {
      return <Subcategory key={key} {...item} />
    })
    subcategories = <div className="subcategories">{items}</div>
  }
  let articles
  if (props.articles) {
    let items = props.articles.map((item, key) => {
      return <CategoryArticle key={key} {...item} />
    })
    articles = <div className="articles">{items}</div>
  }
  let pagination
  if (props.pagination) {
    pagination = <Pagination {...props.pagination} />
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
    <div className="page" id="pageCategory">
      <div className="wrapper">
        {breadcrumbs}
        <header>
          <div className="titleWrapper" style={{ position: 'relative' }}>
            <AdminLink url={`/admin/content/category/${props.pk}/change/`} />
            <h1 className="title"><span>{props.name}</span></h1>
          </div>
          {description}
        </header>
        {subcategories}
        {articles}
        {pagination}
        {backLink}
      </div>
    </div>
  )
}
Category.propTypes = {
  pk: PropTypes.number.isRequired,
  breadcrumbs: PropTypes.array,
  description: PropTypes.string,
  subcategories: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  backLink: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default Category
