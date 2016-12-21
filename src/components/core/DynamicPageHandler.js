import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'

import requestPage from '~/actions/page/requestPage'
import clearPage from '~/actions/page/clearPage'
import Category from '~/components/pages/Category'
import Article from '~/components/pages/Article'
import NotFound from '~/components/pages/NotFound'
import Error from '~/components/pages/Error'
import Redirect from '~/components/utils/Redirect'
import Loading from '~/components/utils/Loading'

class DynamicPageHandler extends Component {
  constructor(props) {
    super(props)
    this.dynamicPageComponents = merge(
      {
        Category,
        Article,
        NotFound,
        Error,
        Redirect // kinda hack, but works fine
      },
      props.dynamicPageComponents
    )
  }
  componentWillMount() {
    /* global __SERVER__ */
    /* global __PROMISES__ */
    if (isEmpty(this.props.page) && !this.props.page.requesting) {
      if (__SERVER__) {
        __PROMISES__.push(new Promise((resolve, reject) => {
          this._requestTimeout = setTimeout(() => {
            this.props.requestPage(this.props.location, resolve)
          }, 0)
        }))
      }
      else {
        this._requestTimeout = setTimeout(() => {
          this.props.requestPage(this.props.location)
        }, 0)
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.location, prevProps.location) && !this.props.page.requesting) {
      this.props.requestPage(this.props.location)
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
      let Component = this.dynamicPageComponents[this.props.page.componentName]
      if (typeof Component === 'undefined') {
        Component = this.dynamicPageComponents.Error
      }
      return <Component {...this.props.page.componentData} />
    }
  }
}
DynamicPageHandler.propTypes = {
  dynamicPageComponents: PropTypes.object.isRequired,
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
DynamicPageHandler = connect(
  mapStateToProps,
  {
    requestPage,
    clearPage
  }
)(DynamicPageHandler)

export default DynamicPageHandler
