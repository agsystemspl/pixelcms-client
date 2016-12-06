import React, { PropTypes } from 'react'

import Module from './Module'
import CategoriesModuleCategory from './CategoriesModule/CategoriesModuleCategory'
import AdminLink from '~/components/liveAdmin/AdminLink'

let CategoriesModule = props => {
  let categories
  if (props.module.data.categories) {
    let items = props.module.data.categories.map((item, key) => {
      return (
        <CategoriesModuleCategory
          key={key}
          namesHeadersLevel={props.module.data.namesHeadersLevel}
          {...item}
        />
      )
    })
    categories = <div className="categories">{items}</div>
  }
  return (
    <div className={props.getHtmlClassName()} style={{ position: 'relative' }}>
      <AdminLink path={`content/categoriesmodule/${props.module.data.pk}/change/`} />
      <div className="wrapper">
        {props.getHeader()}
        {categories}
      </div>
    </div>
  )
}

CategoriesModule.propTypes = {
  module: PropTypes.shape({
    data: PropTypes.shape({
      pk: PropTypes.number.isRequired,
      categories: PropTypes.array.isRequired,
      namesHeadersLevel: PropTypes.string
    }).isRequired
  }).isRequired,
  getHtmlClassName: PropTypes.func.isRequired,
  getHeader: PropTypes.func.isRequired
}

CategoriesModule = Module(
  'categories',
  props => `content/categories-module/${props.templateId}/`,
  'categoriesModule'
)(CategoriesModule)

export default CategoriesModule
