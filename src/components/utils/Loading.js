import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import T from '~/components/utils/T'

let Loading = props => {
  /* global __CLIENT__ */
  if (__CLIENT__) {
    const config = props.config || props.defaultConfig
    const breakStyles = {
      background: config.breakColor,
      width: config.breakWidth,
      height: config.height
    }
    return (
      <div className="loadingComponent">
        <div className="wrapper" style={{ width: config.width }}>
          <div className="text" style={{ marginBottom: config.height }}>
            <T t="Loading..." />
          </div>
          <div className="line" style={{ background: config.lineColor, height: config.height }} />
          <div className="break b1" style={breakStyles} />
          <div className="break b2" style={breakStyles} />
          <div className="break b3" style={breakStyles} />
        </div>
      </div>
    )
  }
  else {
    return null
  }
}
Loading.propTypes = {
  config: PropTypes.object,
  defaultConfig: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  defaultConfig: state.config.loadingConfig
})
Loading = connect(mapStateToProps)(Loading)

export default Loading
