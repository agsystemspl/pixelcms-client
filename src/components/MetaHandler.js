import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'

class MetaHandler extends Component {
  render() {
    const meta = {
      title: this.props.meta.title,
      description: this.props.meta.description,
      meta: {
        name: {
          robots: this.props.meta.robots
        }
      },
      auto: {
        ograph: true
      }
    }
    return (
      <DocumentMeta {...meta}>
        {this.props.children}
      </DocumentMeta>
    )
  }
}
MetaHandler.propTypes = {
  children: PropTypes.element.isRequired,
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    robots: PropTypes.string
  }).isRequired
}

const mapStateToProps = (state) => ({
  meta: state.meta
})
MetaHandler = connect(
  mapStateToProps
)(MetaHandler)

export default MetaHandler
