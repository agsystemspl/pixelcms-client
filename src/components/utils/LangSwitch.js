import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'

class LangSwitch extends Component {
  getOptions() {
    return this.props.langs.map((lang, i) => {
      let link = '/'
      if (lang.code !== this.props.langs[0].code) {
        link += lang.code
      }
      let className
      if (lang.code === this.props.currentLangCode) {
        className = 'active'
      }
      return (
        <li key={i}>
          <Link to={link} className={className}>{lang.name}</Link>
        </li>
      )
    })
  }
  render() {
    return (
      <div className="langSwitch">
        <div className="options"><ul>{this.getOptions()}</ul></div>
      </div>
    )
  }
}
LangSwitch.propTypes = {
  langs: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    code: React.PropTypes.string.isRequired
  })).isRequired,
  currentLangCode: React.PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  langs: state.config.langs,
  currentLangCode: state.route.lang.code
})
LangSwitch = connect(mapStateToProps)(LangSwitch)

export default LangSwitch
