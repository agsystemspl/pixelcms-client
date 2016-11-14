import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Miss from 'react-router/Miss'
import includes from 'lodash/includes'

import Accounts from './Accounts'
import PageHandler from '~/components/core/PageHandler'

let Routes = props => (
  <div>
    {!includes(props.exclude, 'accounts') && props.langs.map((lang, key) => (
      <Accounts key={key} lang={lang.code === props.langs[0].code ? null : lang} />
    ))}
    <Miss component={({ location }) => (
      <PageHandler
        location={location}
        pageComponentsRegistry={props.pageComponentsRegistry}
      />
    )} />
  </div>
)
Routes.propTypes = {
  pageComponentsRegistry: PropTypes.object.isRequired,
  exclude: PropTypes.arrayOf(PropTypes.string),
  langs: PropTypes.arrayOf(React.PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  })).isRequired
}

const mapStateToProps = state => ({
  langs: state.config.langs
})
Routes = connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(Routes)

export default Routes
