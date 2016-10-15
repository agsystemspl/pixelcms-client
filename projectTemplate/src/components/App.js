import React from 'react'
import { Routes as PixelcmsRoutes, Toaster, LiveAdminSidebar } from 'pixelcms-client'

import styles from '~/assets/scss/styles.scss'  // eslint-disable-line no-unused-vars

const App = props => (
  <div id="app">
    <main>
      <PixelcmsRoutes />
    </main>
    <Toaster />
    <LiveAdminSidebar />
  </div>
)

export default App
