import React, { PropTypes } from 'react'

import Module from './Module'

let ContentModule = props => (
  <div className={props.getHtmlClassName()}>
    <div className="wrapper">
      {props.getHeader()}
      <div
        className="content"
        dangerouslySetInnerHTML={{__html: props.module.data.content}}
      />
    </div>
  </div>
)

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
