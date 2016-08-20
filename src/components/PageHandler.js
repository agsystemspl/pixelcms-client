import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'

import { page as pageActions } from '~/actions'
import Loading from './utils/Loading'

class PageHandler extends Component {
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
      return <div id="page" className="loading"><Loading /></div>
    }
    else {
      let component
      component = this.context.pageComponentRegistry[this.props.page.componentName]
      if (typeof component !== 'undefined') {
        let componentData = this.props.page.componentData
        component = React.createElement(component, componentData)
      }
      else {
        component = React.createElement(this.context.pageComponentRegistry.Error)
      }
      return (
        <div id="page">
          {component}
        </div>
      )
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
  pageComponentRegistry: PropTypes.object.isRequired
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
