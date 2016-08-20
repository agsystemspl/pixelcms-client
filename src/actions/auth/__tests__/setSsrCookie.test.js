import setSsrCookie from '../setSsrCookie'

describe('setSsrCookie()', () => {
  it('creates SET_SSR_COOKIE action', () => {
    const cookie = {
      foo: 'bar'
    }
    const expectedAction = {
      type: 'SET_SSR_COOKIE',
      cookie
    }
    expect(
      setSsrCookie(cookie)
    )
    .toEqual(
      expectedAction
    )
  })
})
