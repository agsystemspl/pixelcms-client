import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import withRouter from 'react-router/lib/withRouter'

let Pagination = props => {
  let pages = Array.from(new Array(props.numPages), (val, i) => i + 1)
  if (props.numPages >= 5) {
    if (props.currentPage > 1 && props.currentPage < props.numPages) {
      pages = pages.filter(
        i => (
          i === 1 ||
          (i >= props.currentPage - 1 && i <= props.currentPage + 1) ||
          i === props.numPages
        )
      )
    }
    else {
      pages = pages.filter(
        i => i <= 2 || i >= props.numPages - 1
      )
    }
  }
  let prev
  let pagesToShow = pages.slice()
  let seps = 0
  pages.map((item, index) => {
    if (prev && prev !== item - 1) {
      pagesToShow.splice(index + seps, 0, 'sep')
      seps += 1
    }
    prev = item
  })
  return (
    <div className="pagination">
      {props.showFirstLast && (props.location.query.page > 1) && (
        <span className="firstWrapper">
          <Link to={{
            pathname: props.location.pathname,
            query: Object.assign({}, props.location.query, { page: 1 })
          }}>
            <span className="first" />
          </Link>
        </span>
      )}
      {props.showPrevNext && (props.location.query.page > 1) && (
        <span className="prevWrapper">
          <Link to={{
            pathname: props.location.pathname,
            query: Object.assign({}, props.location.query, { page: props.currentPage - 1 })
          }}>
            <span className="prev" />
          </Link>
        </span>
      )}
      <span className="pages">
        {pagesToShow.map((item, key) => (
          <span key={key} className="wrapper">
            {item !== 'sep' && (
              <span className="pageWrapper">
                {props.currentPage === item && (
                  <span>
                    <span className="item">{item}</span>
                  </span>
                ) || (
                  <Link to={{
                    pathname: props.location.pathname,
                    query: Object.assign({}, props.location.query, { page: item })
                  }}>
                    <span className="item">{item}</span>
                  </Link>
                )}
              </span>
            ) || (
              <span key={key} className="separator" />
            )}
          </span>
        ))}
      </span>
      {props.showPrevNext && (props.location.query.page < props.numPages || !props.location.query.page && props.numPages > 1) && (
        <span className="nextWrapper">
          <Link to={{
            pathname: props.location.pathname,
            query: Object.assign({}, props.location.query, { page: props.currentPage + 1 })
          }}>
            <span className="next" />
          </Link>
        </span>
      )}
      {props.showFirstLast && (props.location.query.page < props.numPages || !props.location.query.page && props.numPages > 1) && (
        <span className="lastWrapper">
          <Link to={{
            pathname: props.location.pathname,
            query: Object.assign({}, props.location.query, { page: props.numPages })
          }}>
            <span className="last" />
          </Link>
        </span>
      )}
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
  showPrevNext: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired
  }).isRequired
}

Pagination = withRouter(Pagination)

export default Pagination
