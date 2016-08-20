import React, { Component } from 'react'

import T from '~/components/utils/T'

class Error extends Component {
  render() {
    return (
      <div id="pageError">
        <div className="container">
          <div className="wrapper">
            <h1 className="title"><span><T t="Error" /></span></h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Error
