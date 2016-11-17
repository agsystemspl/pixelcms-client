import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import requestModule from '~/actions/modules/requestModule'
import Loading from '~/components/utils/Loading'

let Module = (moduleType, getApiPath, moduleTypeHtmlClass) => {
  return ComposedComponent => {
    class Module extends Component {
      makeRequest() {
        this.props.requestModule(
          moduleType,
          this.props.templateId,
          getApiPath(this.props.templateId)
        )
      }
      componentWillMount() {
        if (typeof this.props.module === 'undefined') {
          this.makeRequest()
        }
      }
      componentDidUpdate(prevProps) {
        if (this.props.langCode !== prevProps.langCode) {
          this.makeRequest()
        }
      }
      render() {
        if (isEmpty(this.props.module)) { return null }
        if (this.props.module.loading) { return <Loading /> }
        const getHtmlClassName = () => {
          return [
            'module',
            moduleTypeHtmlClass,
            this.props.module.data.htmlClass || ''
          ].join(' ')
        }
        const getHeader = () => {
          if (this.props.module.data.name) {
            const ModuleHeader = `h${this.props.module.data.moduleNameHeaderLevel}`
            return <ModuleHeader className="name">{this.props.module.data.name}</ModuleHeader>
          }
        }
        return (
          <ComposedComponent
            getHtmlClassName={getHtmlClassName}
            getHeader={getHeader}
            {...this.props}
          />
        )
      }
    }
    Module.propTypes = {
      templateId: PropTypes.string.isRequired,
      langCode: PropTypes.string.isRequired,
      module: PropTypes.shape({
        loading: PropTypes.bool,
        data: PropTypes.oneOfType([
          PropTypes.shape({
            name: PropTypes.string,
            moduleNameHeaderLevel: PropTypes.string,
            htmlClass: PropTypes.string
          }),
          PropTypes.array
        ])
      }),
      requestModule: PropTypes.func.isRequired
    }

    const getModule = (modules, templateId) => {
      try { return modules[moduleType][templateId] }
      catch (e) { return undefined }
    }
    const mapStateToProps = (state, ownProps) => ({
      langCode: state.route.lang.code,
      module: getModule(state.modules, ownProps.templateId)
    })
    return connect(
      mapStateToProps,
      { requestModule }
    )(Module)
  }
}

export default Module
