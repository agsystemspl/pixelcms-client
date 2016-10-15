import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'

let LangSwitch = props => (
  <div className="langSwitch">
    <div className="options">
      <ul>
        {
          props.langs.map((lang, i) => {
            let link = '/'
            if (lang.code !== props.langs[0].code) {
              link += lang.code
            }
            let className
            if (lang.code === props.currentLangCode) {
              className = 'active'
            }
            return (
              <li key={i}>
                <Link to={link} className={className}>{lang.name}</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  </div>
)
LangSwitch.propTypes = {
  langs: PropTypes.arrayOf(React.PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  })).isRequired,
  currentLangCode: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  langs: state.config.langs,
  currentLangCode: state.route.lang.code
})
LangSwitch = connect(
  mapStateToProps
)(LangSwitch)

export default LangSwitch
