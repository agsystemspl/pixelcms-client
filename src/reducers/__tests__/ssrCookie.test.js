import ssrCookie from '../ssrCookie'

describe('ssrCookie reducer', () => {
  it('returns initial state', () => {
    expect(
      ssrCookie(undefined, {})
    )
    .toEqual(
      null
    )
  })
  it('handles SET_SSR_COOKIE with data', () => {
    const action = {
      type: 'SET_SSR_COOKIE',
      cookie: 'foo=bar'
    }
    expect(
      ssrCookie(null, action)
    )
    .toEqual(
      action.cookie
    )
  })
  it('handles SET_SSR_COOKIE without data', () => {
    const action = {
      type: 'SET_SSR_COOKIE'
    }
    expect(
      ssrCookie(null, action)
    )
    .toEqual(
      null
    )
  })
  it('handles other actions and returns unchanged state', () => {
    const state = 'foo=bar'
    const action = {
      type: 'FOO_BAR'
    }
    expect(
      ssrCookie(state, action)
    )
    .toEqual(
      state
    )
  })
})
