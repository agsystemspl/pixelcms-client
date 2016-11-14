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
  }
  componentWillMount() {
    this.handleLocationChange()
  }
  componentDidUpdate() {
    this.handleLocationChange()
  }
  handleLocationChange() {
    this.dispatchLocationChanged()
    this.gaLogPageView()
  }
  dispatchLocationChanged() {
    this.props.locationChanged(
      this.props.location.pathname,
      this.props.location.query,
      this.props.location.search
    )
  }
  gaLogPageView() {
    if (!this.props.gaTrackingId) { return }
    ReactGA.set({
      page: window.location.pathname,
      title: window.location.pathname
    })
    ReactGA.pageview(window.location.pathname)
  }
  render() { return null }
}
LocationHandler.propTypes = {
  location: PropTypes.object.isRequired,
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
