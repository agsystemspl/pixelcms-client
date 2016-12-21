import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withRouter from 'react-router/lib/withRouter'

import langPrefix from '~/utils/langPrefix'

class Redirect extends Component {
  componentWillMount() {
    let target = this.props.to // can be location object or pathname string
    if (typeof target === 'string') {
      target = langPrefix(this.props.to, this.props.lang)
    }
    else {
      target = this.props.to
      target.pathname = langPrefix(target.to.pathname, this.props.lang)
    }
    this.props.router.push(target)
  }
  render() {
    return null
  }
}
Redirect.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired,
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  lang: state.route.lang
})
Redirect = connect(
  mapStateToProps
)(Redirect)

Redirect = withRouter(Redirect)

export default Redirect
