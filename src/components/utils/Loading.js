import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

let Loading = props => {
  /* global __SERVER__ */
  if (__SERVER__) { return null }
  const config = { ...props.defaultConfig, ...props.config }
  const style = {
    width: config.size,
    height: config.size,
    borderWidth: config.borderWidth,
    borderColor: config.borderColor,
    borderStyle: config.borderStyle,
    borderRadius: config.borderRadius,
    animation: `loadingFade .25s .25s backwards, loadingSpin ${config.speed} infinite ${config.easing}`
  }
  return <div className="loadingSpinner"><div style={style} /></div>
}
Loading.propTypes = {
  config: PropTypes.object,
  defaultConfig: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  defaultConfig: state.config.loadingConfig
})
Loading = connect(
  mapStateToProps
)(Loading)

export default Loading
