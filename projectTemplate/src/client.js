import ReactDOM from 'react-dom'
import { initClient } from 'pixelcms-client'

import { config } from '~/config'
import locale from '~/locale'
import * as reducers from './reducers'
import getRoutes from './routes'

const store = initClient(config, locale, reducers)

ReactDOM.render(
  getRoutes(store),
  document.getElementById('root')
)
