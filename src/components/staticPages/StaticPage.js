import React, { Component, PropTypes } from 'react'
import isEqual from 'lodash/isEqual'
import { connect } from 'react-redux'
import { meta as metaActions } from '~/actions'

const StaticPage = ComposedComponent => {
  class StaticPage extends Component {
    componentWillMount() {
      if (!isEqual(this.props.metaFromState, this.props.meta)) {
        this.props.changeMeta(this.props.meta)
      }
    }
    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  StaticPage.propTypes = {
    meta: PropTypes.object.isRequired,
    metaFromState: PropTypes.object.isRequired,
    changeMeta: PropTypes.func.isRequired
  }

  const mapStateToProps = (state) => ({
    metaFromState: state.meta
  })
  return connect(
    mapStateToProps,
    { changeMeta: metaActions.changeMeta }
  )(StaticPage)
}

export default StaticPage
