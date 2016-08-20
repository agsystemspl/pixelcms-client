import React, { Component, PropTypes } from 'react'

class Mailto extends Component {
  handleClick(e) {
    e.preventDefault()
    /* global __CLIENT__ */
    if (__CLIENT__) {
      window.location.replace('mailto:' + this.props.email)
    }
  }
  render() {
    let email = this.props.email.split('').reverse().join('')
    let style
    if (!this.props.text) {
      style = {
        unicodeBidi: 'bidi-override',
        direction: 'rtl',
        textAlign: 'left'
      }
    }
    return (
      <a
        href={'mailto:' + email}
        style={style}
        onClick={(e) => this.handleClick(e)}
      >
        {this.props.text || email}
      </a>
    )
  }
}
Mailto.propTypes = {
  email: PropTypes.string.isRequired,
  text: PropTypes.string
}

export default Mailto
