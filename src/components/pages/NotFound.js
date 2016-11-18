import React from 'react'

import T from '~/components/utils/T'

const NotFound = () => (
  <div className="page" id="pageNotFound">
    <div className="wrapper">
      <h1 className="title"><span><T t="Not found" /></span></h1>
      <div className="msg">
        <T t="The page you are looking for does not exist, or has been moved." />
      </div>
    </div>
  </div>
)

export default NotFound
