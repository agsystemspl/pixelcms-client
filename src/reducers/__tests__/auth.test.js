import auth from '../auth'

describe('auth reducer', () => {
  it('returns initial state', () => {
    expect(
      auth(undefined, {})
    )
    .toEqual(
      { authInfo: {} }
    )
  })
  it('handles UPDATE_AUTH_INFO', () => {
    const action = {
      type: 'UPDATE_AUTH_INFO',
      authInfo: {
        user: 'Foo',
        isAdmin: false
      }
    }
    expect(
      auth(null, action)
    )
    .toEqual(
      { authInfo: action.authInfo }
    )
  })
  it('handles other actions and returns unchanged state', () => {
    const state = {
      authInfo: {
        user: 'Foo',
        isAdmin: false
      }
    }
    const action = {
      type: 'FOO_BAR'
    }
    expect(
      auth(state, action)
    )
    .toEqual(
      state
    )
  })
})
