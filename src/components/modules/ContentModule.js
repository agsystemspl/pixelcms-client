import React, { PropTypes } from 'react'

import Module from './Module'
import EditableContent from '~/components/LiveAdmin/EditableContent'
import AdminLink from '~/components/LiveAdmin/AdminLink'

let ContentModule = props => (
  <div className={props.getHtmlClassName()} style={{ position: 'relative' }}>
    <AdminLink url={`/admin/content/contentmodule/${props.module.data.pk}/change/`} />
    <div className="wrapper">
      {props.getHeader()}
      <div className="content">
        <EditableContent
          model="cms.content.models.ContentModule"
          pk={props.module.data.pk}
          field="content"
          content={props.module.data.content}
        />
      </div>
    </div>
  </div>
)

ContentModule.propTypes = {
  module: PropTypes.shape({
    data: PropTypes.shape({
      pk: PropTypes.number.isRequired,
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
