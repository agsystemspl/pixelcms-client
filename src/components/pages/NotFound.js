import React, { Component } from 'react'

import T from '~/components/utils/T'

class NotFound extends Component {
  render() {
    return (
      <div id="pageNotFound">
        <div className="container">
          <div className="wrapper">
            <h1 className="title"><span><T t="Not found" /></span></h1>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound
