import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import removeToast from '~/actions/toaster/removeToast'

class Toaster extends Component {
  render() {
    let toasts = []
    Object.keys(this.props.toaster).map((item, key) => {
      const toast = this.props.toaster[item]
      let icon
      if (toast.icon) {
        icon = toast.icon
      }
      else {
        switch (toast.type) {
          case 'info':
            icon = 'info_outline'
            break
          case 'success':
            icon = 'done'
            break
          case 'error':
            icon = 'highlight_off'
            break
          case 'warning':
            icon = 'warning'
            break
        }
      }
      toasts.push(
        <div
          key={item}
          className={`toast ${toast.type}`}
          onClick={() => this.props.removeToast(item)}
        >
          <div className="wrapper">
            <div className="icon">
              <i className="material-icons">{icon}</i>
            </div>
            <div className="text">
              {toast.title && (<div className="title" dangerouslySetInnerHTML={{__html: toast.title}} />)}
              {toast.message && (<div className="message" dangerouslySetInnerHTML={{__html: toast.message}} />)}
            </div>
          </div>
        </div>
      )
    })
    return (
      <div id="toaster">
        <ReactCSSTransitionGroup
          transitionName="toast"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          {toasts}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
Toaster.propTypes = {
  toaster: PropTypes.object.isRequired,
  removeToast: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  toaster: state.toaster
})
Toaster = connect(
  mapStateToProps,
  { removeToast }
)(Toaster)

export default Toaster
