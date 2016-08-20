import React, { Component, PropTypes } from 'react'

import QueryLink from '~/components/utils/QueryLink'
import T from '~/components/utils/T'

class Pagination extends Component {
  render() {
    const pages = [...Array(this.props.numPages).keys()].map((i, key) => {
      return (
        <QueryLink key={key} query={{ page: i + 1 }}>
          <span>{i + 1}</span>
        </QueryLink>
      )
    })
    let prev
    if (this.props.currentPage > 1) {
      prev = (
        <div className="prev">
          <QueryLink query={{ page: this.props.currentPage - 1 }}>
            <span><T t="Previous" /></span>
          </QueryLink>
        </div>
      )
    }
    let next
    if (this.props.currentPage < this.props.numPages) {
      next = (
        <div className="next">
          <QueryLink query={{ page: this.props.currentPage + 1 }}>
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
          <QueryLink query={{ page: this.props.numPages }}>
            <span><T t="Last" /></span>
          </QueryLink>
        </div>
      </div>
    )
  }
}
Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
