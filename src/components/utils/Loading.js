import React, { PropTypes } from 'react'

const Loading = props => {
  return <div className="loadingSpinner"><div style={props.style} /></div>
}
Loading.propTypes = {
  style: PropTypes.object
}

export default Loading
