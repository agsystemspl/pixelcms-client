import React, { Component, PropTypes } from 'react'

import Module from './Module'

class ContentModule extends Component {
  render() {
    return (
      <div className={this.props.getHtmlClassName()}>
        <div className="wrapper">
          {this.props.getHeader()}
          <div
            className="content"
            dangerouslySetInnerHTML={{__html: this.props.module.data.content}}
          />
        </div>
      </div>
    )
  }
}

ContentModule.propTypes = {
  module: PropTypes.shape({
    data: PropTypes.shape({
      content: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  getHtmlClassName: PropTypes.func.isRequired,
  getHeader: PropTypes.func.isRequired
}

ContentModule = Module(
  'content',
  templateId => `content/content-module/${templateId}/`,
  'contentModule'
)(ContentModule)

export default ContentModule
