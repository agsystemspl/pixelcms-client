import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'

import { page as pageActions } from '~/actions'
import Category from '~/components/pages/Category'
import Article from '~/components/pages/Article'
import NotFound from '~/components/pages/NotFound'
import Error from '~/components/pages/Error'
import Loading from '~/components/utils/Loading'

class PageHandler extends Component {
  constructor() {
    super()
    this.pageComponentsRegistry = merge(
      {
        Category,
        Article,
        NotFound,
        Error
      },
      require('../../../../../src/config').pageComponentsRegistry
    )
  }
  componentWillMount() {
    if (isEmpty(this.props.page)) {
      this.props.requestPage()
    }
  }
  componentWillUnmount() {
    this.props.clearPage()
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.route, prevProps.route)) {
      this.props.requestPage()
    }
  }
  render() {
    if (this.props.page.loading) {
      return <div className="page loading"><Loading /></div>
    }
    else {
      let Component = this.pageComponentsRegistry[this.props.page.componentName]
      if (typeof Component === 'undefined') {
        Component = this.pageComponentsRegistry.Error
      }
      return <Component {...this.props.page.componentData} />
    }
  }
}
PageHandler.propTypes = {
  page: PropTypes.shape({
    componentName: PropTypes.string,
    componentData: PropTypes.object,
    loading: PropTypes.bool
  }).isRequired,
  route: PropTypes.object.isRequired,
  requestPage: PropTypes.func.isRequired,
  clearPage: PropTypes.func.isRequired
}
PageHandler.contextTypes = {
  router: PropTypes.object
}

const mapStateToProps = (state) => ({
  page: state.page,
  route: state.route
})
PageHandler = connect(
  mapStateToProps,
  {
    requestPage: pageActions.requestPage,
    clearPage: pageActions.clearPage
  }
)(PageHandler)

export default PageHandler
