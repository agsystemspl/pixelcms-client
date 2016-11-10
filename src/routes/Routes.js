import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Miss from 'react-router/Miss'
import includes from 'lodash/includes'

import Accounts from './Accounts'
import PageHandler from '~/components/core/PageHandler'

let Routes = props => (
  <div>
    {!includes(props.exclude, 'accounts') && <Accounts lang={props.lang} />}
    <Miss component={() => <PageHandler pageComponentsRegistry={props.pageComponentsRegistry} />} />
  </div>
)
Routes.propTypes = {
  pageComponentsRegistry: PropTypes.object.isRequired,
  exclude: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  lang: state.route.lang
})
Routes = connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(Routes)

export default Routes
