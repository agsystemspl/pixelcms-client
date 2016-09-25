import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import uniqueId from 'lodash/uniqueId'
import { toastr } from 'react-redux-toastr'
import ReactTooltip from 'react-tooltip'

import ApiRequest from '~/utils/ApiRequest'
import t from '~/utils/i18n/t'
import T from '~/components/utils/T'

class EditableContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialized: false,
      dirty: false,
      processing: false
    }
  }
  componentWillUnmount() {
    if (this.editor) { this.editor.destroy() }
  }
  setPrisitne() {
    this.editor.setDirty(false)
    this.setState(Object.assign({}, this.state, { dirty: false }))
  }
  handleRevert() {
    this.setState(Object.assign({}, this.state, { processing: true }))
    const params = {
      model: this.props.model,
      pk: this.props.pk,
      field: this.props.field
    }
    new ApiRequest().get('live-admin/editable-content/', this.context.store.dispatch, this.context.store.getState, { params })
      .then(
        (res) => {
          toastr.success('', t(this.context.store.getState(), 'Changes has been reverted.'), {
            icon: 'icon-information-circle'
          })
          this.editor.setContent(res.body.content)
          this.setPrisitne()
        },
        () => {
          toastr.error('', t(this.context.store.getState(), 'Error occured while reverting changes.'), {
            icon: 'icon-exclamation-triangle'
          })
        }
      )
      .then(() => {
        this.setState(Object.assign({}, this.state, { processing: false }))
      })
  }
  handleSave() {
    this.setState(Object.assign({}, this.state, { processing: true }))
    const data = {
      model: this.props.model,
      pk: this.props.pk,
      field: this.props.field,
      content: this.editor.getContent()
    }
    new ApiRequest().patch('live-admin/editable-content/', this.context.store.dispatch, this.context.store.getState, { data })
      .then(
        () => {
          toastr.success('', t(this.context.store.getState(), 'Changes has been saved.'), {
            icon: 'icon-information-circle'
          })
          this.setPrisitne()
        },
        () => {
          toastr.error('', t(this.context.store.getState(), 'Error occured while saving changes.'), {
            icon: 'icon-exclamation-triangle'
          })
        }
      )
      .then(() => {
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
        theme: 'inlite',
        inline: true,
        selection_toolbar: 'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify',
        init_instance_callback: editor => {
          editor.on('Dirty', () => {
            this.setState(Object.assign({}, this.state, { dirty: true }))
          })
        }
      }).then(editors => {
        this.editor = tinyMCE.get(editorId)
        this.editor.fire('focus')
        this.setState(Object.assign({}, this.state, { initialized: true }))
      })
    }
  }
  render() {
    if (!this.props.authInfo.isAdmin) {
      return <div dangerouslySetInnerHTML={{__html: this.props.content}} />
    }
    return (
      <div className={`editableContent ${this.props.liveAdmin.markEditableContent && 'marked' || ''}`}>
        {this.state.initialized && this.state.dirty && (
          <div className="toolbar">
            <span className="text"><T t={!this.state.processing && 'Unsaved changes' || 'Processing...'} /></span>
            {!this.state.processing && (
              <span>
                <button
                  onClick={() => this.handleRevert()}
                  data-tip={`${t(this.context.store.getState(), 'Revert changes')}`}
                  data-for={`liveAdminEditor_${this._editor.id}`}
                >
                  <i className="fa fa-undo" />
                </button>
                <button
                  onClick={() => this.handleSave()}
                  data-tip={`${t(this.context.store.getState(), 'Save changes')}`}
                  data-for={`liveAdminEditor_${this._editor.id}`}
                >
                  <i className="fa fa-save" />
                </button>
                <ReactTooltip id={`liveAdminEditor_${this._editor.id}`} effect="solid" />
              </span>
            )}
          </div>
        )}
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
  authInfo: PropTypes.shape({
    isAdmin: PropTypes.bool
  }).isRequired,
  liveAdmin: PropTypes.shape({
    markEditableContent: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = (state) => ({
  authInfo: state.auth.authInfo,
  liveAdmin: state.liveAdmin
})
EditableContent = connect(
  mapStateToProps
)(EditableContent)

export default EditableContent
