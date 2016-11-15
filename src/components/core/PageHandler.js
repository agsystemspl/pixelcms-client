import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'

import requestPage from '~/actions/page/requestPage'
import clearPage from '~/actions/page/clearPage'
import Category from '~/components/pages/Category'
import Article from '~/components/pages/Article'
import NotFound from '~/components/pages/NotFound'
import Error from '~/components/pages/Error'
import Loading from '~/components/utils/Loading'

class PageHandler extends Component {
  constructor(props) {
    super(props)
    this.pageComponentsRegistry = merge(
      {
        Category,
        Article,
        NotFound,
        Error
      },
      props.pageComponentsRegistry
    )
  }
  componentWillMount() {
    /* global __SERVER__ */
    /* global __PROMISES__ */
    if (isEmpty(this.props.page) && !this.props.page.requesting) {
      if (__SERVER__) {
        __PROMISES__.push(new Promise((resolve, reject) => {
          this._requestTimeout = setTimeout(() => {
            this.props.requestPage(resolve)
          }, 0)
        }))
      }
      else {
        this._requestTimeout = setTimeout(() => {
          this.props.requestPage()
        }, 0)
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this._requestTimeout)
    this.props.clearPage()
  }
  render() {
    if (isEmpty(this.props.page) || this.props.page.requesting) {
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
  pageComponentsRegistry: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  page: PropTypes.shape({
    requesting: PropTypes.bool,
    componentName: PropTypes.string,
    componentData: PropTypes.object
  }).isRequired,
  requestPage: PropTypes.func.isRequired,
  clearPage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  page: state.page
})
PageHandler = connect(
  mapStateToProps,
  {
    requestPage,
    clearPage
  }
)(PageHandler)

export default PageHandler
