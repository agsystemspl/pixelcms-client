import React, { PropTypes } from 'react'

import QueryLink from '~/components/utils/QueryLink'
import T from '~/components/utils/T'

const Pagination = props => {
  const pages = [...Array(props.numPages).keys()].map((i, key) => {
    return (
      <QueryLink key={key} query={{ page: i + 1 }}>
        <span>{i + 1}</span>
      </QueryLink>
    )
  })
  let prev
  if (props.currentPage > 1) {
    prev = (
      <div className="prev">
        <QueryLink query={{ page: props.currentPage - 1 }}>
          <span><T t="Previous" /></span>
        </QueryLink>
      </div>
    )
  }
  let next
  if (props.currentPage < props.numPages) {
    next = (
      <div className="next">
        <QueryLink query={{ page: props.currentPage + 1 }}>
          <span><T t="Next" /></span>
        </QueryLink>
      </div>
    )
  }
  return (
    <div className="pagination">
      <div className="first">
        <QueryLink query={{ page: 1 }}>
          <span><T t="First" /></span>
        </QueryLink>
      </div>
      {prev}
      <div className="pages">
        {pages}
      </div>
      {next}
      <div className="last">
        <QueryLink query={{ page: props.numPages }}>
          <span><T t="Last" /></span>
        </QueryLink>
      </div>
    </div>
  )
}
Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
