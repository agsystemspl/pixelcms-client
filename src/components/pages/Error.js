import React from 'react'

import T from '~/components/utils/T'

const Error = () => (
  <div className="page" id="pageError">
    <div className="wrapper">
      <h1 className="title"><span><T t="Error" /></span></h1>
      <div className="msg">
        <T t="Error occured. We've been informed about this issue." />
      </div>
    </div>
  </div>
)

export default Error
