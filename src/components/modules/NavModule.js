import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link as ScrollLink } from 'react-scroll'

import Module from './Module'
import Link from '~/components/utils/Link'

class NavModule extends Component {
  render() {
    let items = this.props.module.data.items.map((item, i) => {
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
            {...this.props.scrollProps}
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
      <div className={this.props.getHtmlClassName()}>
        <div className="wrapper">
          {this.props.getHeader()}
          <nav>
            <ul>
              {items}
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

NavModule.propTypes = {
  module: PropTypes.shape({
    data: PropTypes.shape({
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
