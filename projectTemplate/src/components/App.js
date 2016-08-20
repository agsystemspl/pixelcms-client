import React, { PropTypes } from 'react'

import styles from '~/assets/scss/styles.scss'  // eslint-disable-line no-unused-vars

const App = props => {
  return (
    <div id="app">
      <main>
        {props.children}
      </main>
    </div>
  )
}
App.propTypes = {
  children: PropTypes.node
}

export default App
