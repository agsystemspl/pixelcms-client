import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class Lightbox extends Component {
  componentDidMount() {
    /* global __CLIENT__ */
    if (__CLIENT__) {
      require('lightgallery.js')
      /* global lightGallery */
      lightGallery(ReactDOM.findDOMNode(this.refs.lightbox), {
        ...this.props.config,
        selector: '.item a'
      })
    }
  }
  render() {
    let items = this.props.items.map((item, key) => {
      return (
        <div key={key} className="item">
          <a href={item.fullSize} data-sub-html={item.title}>
            <img
              src={item.thumbnail}
              alt={item.title}
            />
          </a>
        </div>
      )
    })
    return (
      <div className="lightbox" ref="lightbox">{items}</div>
    )
  }
}
Lightbox.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      fullSize: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      title: PropTypes.string
    }).isRequired
  ).isRequired,
  config: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  config: state.config.lightboxConfig
})
Lightbox = connect(mapStateToProps)(Lightbox)

export default Lightbox
