import request from 'superagent'
import cookie from 'react-cookie'

import { auth as authActions } from '~/actions'

const methods = ['get', 'post', 'put', 'patch', 'delete']

class ApiRequest {
  constructor() {
    methods.forEach(
      (method) => (
        this[method] = (path, dispatch, getState, { params, data, headers } = {}) => new Promise((resolve, reject) => {
          const req = request[method](getState().config.apiRoot + path)

          req.withCredentials()

          // query params
          if (params) { req.query(params) }

          // payload
          if (data) { req.send(data) }

          // headers
          req.set('accept', 'application/json')
          req.set('accept-language', getState().route.lang.code)
          /* global __SERVER__ */
          const ssrCookie = getState().ssrCookie
          if (__SERVER__) {
            if (ssrCookie) {
              req.set('cookie', ssrCookie)
            }
          }
          const csrfToken = cookie.load('csrftoken')
          if (method !== 'get' && csrfToken) {
            req.set('x-csrftoken', csrfToken)
          }
          if (headers) { req.set(headers) }

          req.end(
            (err, res) => {
              if (res.headers['x-authinfo']) {
                dispatch(authActions.updateAuthInfo(res.headers['x-authinfo']))
              }
              return err ? reject(res) : resolve(res)
            }
          )
        })
      )
    )
  }
}

export default ApiRequest
