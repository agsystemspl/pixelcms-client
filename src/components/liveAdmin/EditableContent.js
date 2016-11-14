import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import uniqueId from 'lodash/uniqueId'
import queryString from 'query-string'

import apiRequest from '~/utils/apiRequest'
import addToast from '~/actions/toaster/addToast'
import t from '~/utils/i18n/t'

class EditableContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialized: false,
      processing: false
    }
  }
  componentWillUnmount() {
    if (this.editor) { this.editor.destroy() }
  }
  handleSave() {
    this.setState(Object.assign({}, this.state, { processing: true }))
    const data = {
      model: this.props.model,
      pk: this.props.pk,
      field: this.props.field,
      content: this.editor.getContent()
    }
    apiRequest(
      this.context.store.dispatch, this.context.store.getState,
      'live-admin/editable-content/',
      {
        method: 'PATCH',
        body: JSON.stringify(data)
      }
    )
      .then(({ data, ok, status }) => {
        if (ok) {
          this.props.addToast('success', t(this.context.store.getState(), 'Changes has been saved.'), null)
        }
        else {
          this.props.addToast('error', t(this.context.store.getState(), 'Error occured while saving changes.'), null)
        }
        this.setState(Object.assign({}, this.state, { processing: false }))
      })
  }
  handleRevert() {
    this.setState(Object.assign({}, this.state, { processing: true }))
    const params = {
      model: this.props.model,
      pk: this.props.pk,
      field: this.props.field
    }
    apiRequest(
      this.context.store.dispatch, this.context.store.getState,
      `live-admin/editable-content/?${queryString.stringify(params)}`
    )
      .then(({ data, ok, status }) => {
        if (ok) {
          this.props.addToast('success', t(this.context.store.getState(), 'Changes has been reverted.'), null)
          this.editor.setContent(data.content)
        }
        else {
          this.props.addToast('error', t(this.context.store.getState(), 'Error occured while reverting changes.'), null)
        }
        this.setState(Object.assign({}, this.state, { processing: false }))
      })
  }
  handleClick() {
    if (!this.state.initialized) {
      const editorId = uniqueId('editor')
      this._editor.id = editorId
      /* global tinyMCE */
      tinyMCE.init({
        selector: `#${editorId}`,
        inline: true,
        browser_spellcheck: true,
        plugins: 'searchreplace textcolor colorpicker table link anchor image imagetools media charmap hr code visualblocks save',
        menubar: '',
        toolbar1: 'undo redo | searchreplace | bold italic underline strikethrough | forecolor backcolor | subscript superscript | outdent indent | alignleft aligncenter alignright alignjustify | bullist numlist | blockquote',
        toolbar2: 'formatselect fontsizeselect | table | link unlink | anchor | image media | charmap hr | visualblocks code | cancel, save',
        fontsize_formats: '0.5rem 0.75rem 1rem 1.15rem 1.25rem 1.5rem 1.75rem 2rem 2.5rem 3rem 4rem 5rem',
        paste_data_images: true,
        save_onsavecallback: () => { this.handleSave() },
        save_oncancelcallback: () => { this.handleRevert() }
      }).then(editors => {
        this.editor = tinyMCE.get(editorId)
        this.editor.fire('focus')
        this.setState(Object.assign({}, this.state, { initialized: true }))
      })
    }
  }
  render() {
    if (!this.props.isAdmin) {
      return <div dangerouslySetInnerHTML={{__html: this.props.content}} />
    }
    return (
      <div className={`editableContent ${this.props.liveAdmin.markEditableContent && 'marked' || ''}`}>
        <div
          className="editor"
          dangerouslySetInnerHTML={{__html: this.props.content}}
          onClick={() => this.handleClick()}
          ref={e => { this._editor = e }}
        />
      </div>
    )
  }
}
EditableContent.contextTypes = {
  store: PropTypes.object.isRequired
}
EditableContent.propTypes = {
  model: PropTypes.string.isRequired,
  pk: PropTypes.number.isRequired,
  field: PropTypes.string.isRequired,
  content: PropTypes.string,
  isAdmin: PropTypes.bool,
  liveAdmin: PropTypes.shape({
    markEditableContent: PropTypes.bool.isRequired
  }).isRequired,
  addToast: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAdmin: state.authInfo.user.isAdmin,
  liveAdmin: state.liveAdmin
})
EditableContent = connect(
  mapStateToProps,
  { addToast }
)(EditableContent)

export default EditableContent
