import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link as ScrollLink } from 'react-scroll'

import Module from './Module'
import Link from '~/components/utils/Link'
import AdminLink from '~/components/LiveAdmin/AdminLink'

let NavModule = props => {
  let items = props.module.data.items.map((item, i) => {
    let navItem
    if (item.link) {
      if (item.linkOpenInNewTab) {
        var attrs = {target: '_blank'}
      }
      navItem = (
        <a href={item.link} {...attrs}><span>{item.name}</span></a>
      )
    }
    else if (item.scrollToElement) {
      navItem = (
        <ScrollLink
          to={item.scrollToElement}
          spy={true}
          activeClass="active"
          isDynamic={true}
          {...props.scrollProps}
        >
          <span>{item.name}</span>
        </ScrollLink>
      )
    }
    else if (item.route) {
      navItem = (
        <Link to={item.route} activeClassName="active">
          <span>{item.name}</span>
        </Link>
      )
    }
    else {
      navItem = <span><span>{item.name}</span></span>
    }
    return <li key={i}>{navItem}</li>
  })
  return (
    <div className={props.getHtmlClassName()} style={{ position: 'relative' }}>
      <AdminLink url={`/admin/nav/navmodule/${props.module.data.pk}/change/`} />
      <div className="wrapper">
        {props.getHeader()}
        <nav>
          <ul>
            {items}
          </ul>
        </nav>
      </div>
    </div>
  )
}

NavModule.propTypes = {
  module: PropTypes.shape({
    data: PropTypes.shape({
      pk: PropTypes.number.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          route: PropTypes.string,
          scrollToElement: PropTypes.string,
          link: PropTypes.string,
          linkOpenInNewTab: PropTypes.bool
        }).isRequired
      ).isRequired
    }).isRequired
  }).isRequired,
  getHtmlClassName: PropTypes.func.isRequired,
  getHeader: PropTypes.func.isRequired,
  scrollProps: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  scrollProps: state.config.scrollProps
})
NavModule = connect(
  mapStateToProps
)(NavModule)

NavModule = Module(
  'nav',
  templateId => `nav/${templateId}/`,
  'navModule'
)(NavModule)

export default NavModule
