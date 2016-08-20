import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import { modules as modulesActions } from '~/actions'
import Loading from '~/components/utils/Loading'

const Module = ComposedComponent => {
  class Module extends ComposedComponent {
    makeRequest() {
      this.props.requestModule(
        ComposedComponent.moduleType,
        this.props.templateId,
        ComposedComponent.getApiPath(this.props.templateId)
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
      const getHtmlClassName = () => {
        return [
          'module',
          ComposedComponent.moduleTypeHtmlClass,
          this.props.module.data.htmlClass || ''
        ].join(' ')
      }
      const getHeader = () => {
        if (this.props.module.data.name) {
          const ModuleHeader = `h${this.props.module.data.moduleNameHeaderLevel}`
          return <ModuleHeader className="name">{this.props.module.data.name}</ModuleHeader>
        }
      }
      if (isEmpty(this.props.module)) { return null }
      if (this.props.module.loading) { return <Loading /> }
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
      data: PropTypes.shape({
        name: PropTypes.string,
        moduleNameHeaderLevel: PropTypes.number,
        htmlClass: PropTypes.string
      })
    }),
    requestModule: PropTypes.func.isRequired
  }

  const getModule = (modules, templateId) => {
    try { return modules[ComposedComponent.moduleType][templateId] }
    catch (e) { return undefined }
  }
  const mapStateToProps = (state, ownProps) => ({
    langCode: state.route.lang.code,
    module: getModule(state.modules, ownProps.templateId)
  })
  return connect(
    mapStateToProps,
    { requestModule: modulesActions.requestModule }
  )(Module)
}

export default Module
