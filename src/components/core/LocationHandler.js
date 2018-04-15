import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'

import locationChanged from '~/actions/route/locationChanged'

class LocationHandler extends Component {
  constructor(props) {
    super(props)
    if (props.gaTrackingId) {
      ReactGA.initialize(props.gaTrackingId, {
        debug: process.env.NODE_ENV !== 'production'
      })
    }
    this.handleLocationChange(props.history.getCurrentLocation())
    props.history.listen(location => this.handleLocationChange(location))
  }
  handleLocationChange(location) {
    this.dispatchLocationChanged(location)
    this.gaLogPageView()
  }
  dispatchLocationChanged(location) {
    this.props.locationChanged(
      location.pathname,
      location.query,
      location.search
    )
  }
  gaLogPageView() {
    /* global __PROMISES__ */
    if (!this.props.gaTrackingId || __SERVER__) { return }
    ReactGA.set({
      page: window.location.pathname,
      title: window.location.pathname
    })
    ReactGA.pageview(window.location.pathname)
  }
  render() { return null }
}
LocationHandler.propTypes = {
  history: PropTypes.object.isRequired,
  gaTrackingId: PropTypes.string,
  locationChanged: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  gaTrackingId: state.config.gaTrackingId
})
LocationHandler = connect(
  mapStateToProps,
  { locationChanged }
)(LocationHandler)

export default LocationHandler
