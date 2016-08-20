import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import getTranslation from '~/utils/i18n/getTranslation'

class T extends Component {
  render() {
    if (this.props.lang === 'en') {
      return <span>{this.props.t}</span>
    }
    return (
      <span>
        {getTranslation(
          this.props.t,
          this.props.ns,
          this.props.lang,
          this.props.locale
        )}
      </span>
    )
  }
}
T.defaultProps = {
  ns: 'default'
}
T.propTypes = {
  t: PropTypes.string.isRequired,
  ns: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  lang: state.route.lang.code
})
T = connect(
  mapStateToProps
)(T)

export default T
