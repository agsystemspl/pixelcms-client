import { Component, PropTypes } from 'react'
import merge from 'lodash/merge'

import Category from './pages/Category'
import Article from './pages/Article'
import NotFound from './pages/NotFound'
import Error from './pages/Error'

class PageComponentRegistryProvider extends Component {
  getChildContext() {
    const pixelcmsRegistry = {
      Category,
      Article,
      NotFound,
      Error
    }
    return {
      pageComponentRegistry: merge({}, pixelcmsRegistry, this.props.registry)
    }
  }
  render() {
    return this.props.children || null
  }
}
PageComponentRegistryProvider.propTypes = {
  registry: PropTypes.object.isRequired,
  children: PropTypes.element
}
PageComponentRegistryProvider.childContextTypes = {
  pageComponentRegistry: PropTypes.object.isRequired
}

export default PageComponentRegistryProvider
