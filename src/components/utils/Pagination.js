import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import withRouter from 'react-router/lib/withRouter'

let Pagination = props => (
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
      {[...Array(props.numPages).keys()].map((item, key) => (
        <span key={key} className="pageWrapper">
          {props.currentPage === key + 1 && (
            <span>
              <span className="item">{item + 1}</span>
            </span>
          ) || (
            <Link to={{
              pathname: props.location.pathname,
              query: Object.assign({}, props.location.query, { page: item + 1 })
            }}>
              <span className="item">{item + 1}</span>
            </Link>
          )}
        </span>
      ))}
    </span>
    {props.showPrevNext && (props.location.query.page < props.numPages || !props.location.query.page) && (
      <span className="nextWrapper">
        <Link to={{
          pathname: props.location.pathname,
          query: Object.assign({}, props.location.query, { page: props.currentPage + 1 })
        }}>
          <span className="next" />
        </Link>
      </span>
    )}
    {props.showFirstLast && (props.location.query.page < props.numPages || !props.location.query.page) && (
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
