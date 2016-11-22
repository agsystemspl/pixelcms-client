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
  let prev, next
  if (props.showPrevNext) {
    if (props.currentPage > 1) {
      prev = (
        <div className="prev">
          <Link to={`?page=${props.currentPage - 1}`}>
            <span><T t="Previous" /></span>
          </Link>
        </div>
      )
    }
    if (props.currentPage < props.numPages) {
      next = (
        <div className="next">
          <Link to={`?page=${props.currentPage + 1}`}>
            <span><T t="Next" /></span>
          </Link>
        </div>
      )
    }
  }
  let first, last
  if (props.showFirstLast) {
    first = (
      <div className="first">
        <Link to="?page=1">
          <span><T t="First" /></span>
        </Link>
      </div>
    )
    last = (
      <div className="last">
        <Link to={`?page=${props.numPages}`}>
          <span><T t="Last" /></span>
        </Link>
      </div>
    )
  }
  return (
    <div className="pagination">
      {first}
      {prev}
      <div className="pages">
        {pages}
      </div>
      {next}
      {last}
    </div>
  )
}
Pagination.defaultProps = {
  showFirstLast: true,
  showPrevNext: true
}
Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  showFirstLast: PropTypes.bool.isRequired,
  showPrevNext: PropTypes.bool.isRequired
}

export default Pagination
