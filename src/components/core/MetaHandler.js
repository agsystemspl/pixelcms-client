import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'

let MetaHandler = props => {
  const meta = {
    title: props.meta.title,
    description: props.meta.description,
    meta: {
      name: {
        robots: props.meta.robots
      }
    },
    auto: {
      ograph: true
    }
  }
  return (
    <DocumentMeta {...meta} />
  )
}
MetaHandler.propTypes = {
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
