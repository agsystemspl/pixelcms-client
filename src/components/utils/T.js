import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import getTranslation from '~/utils/i18n/getTranslation'

let T = props => {
  if (props.lang === 'en') {
    return <span>{props.t}</span>
  }
  return (
    <span>
      {getTranslation(
        props.t,
        props.ns,
        props.lang,
        props.locale
      )}
    </span>
  )
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
