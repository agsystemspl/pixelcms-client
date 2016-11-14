import React, { PropTypes } from 'react'
import Link from 'react-router/Link'

import T from '~/components/utils/T'

const Pagination = props => {
  const pages = [...Array(props.numPages).keys()].map((i, key) => {
    if (props.currentPage === i + 1) {
      return (
        <span key={key}>
          <span>{i + 1}</span>
        </span>
      )
    }
    else {
      return (
        <Link key={key} to={`?page=${i + 1}`}>
          <span>{i + 1}</span>
        </Link>
      )
    }
  })
  let prev
  if (props.currentPage > 1) {
    prev = (
      <div className="prev">
        <Link to={`?page=${props.currentPage - 1}`}>
          <span><T t="Previous" /></span>
        </Link>
      </div>
    )
  }
  let next
  if (props.currentPage < props.numPages) {
    next = (
      <div className="next">
        <Link to={`?page=${props.currentPage + 1}`}>
          <span><T t="Next" /></span>
        </Link>
      </div>
    )
  }
  return (
    <div className="pagination">
      <div className="first">
        <Link to="?page=1">
          <span><T t="First" /></span>
        </Link>
      </div>
      {prev}
      <div className="pages">
        {pages}
      </div>
      {next}
      <div className="last">
        <Link to={`?page=${props.numPages}`}>
          <span><T t="Last" /></span>
        </Link>
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
