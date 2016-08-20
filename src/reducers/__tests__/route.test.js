import route from '../route'

const availableLangs = [
  { code: 'foo', name: 'Foo' },
  { code: 'bar', name: 'Bar' }
]

describe('route reducer', () => {
  it('returns initial state', () => {
    expect(
      route(undefined, {})
    )
    .toEqual(
      {}
    )
  })
  it('handles LOCATION_CHANGED with default language', () => {
    const action = {
      type: 'LOCATION_CHANGED',
      path: '/foo/page',
      availableLangs
    }
    expect(
      route(null, action)
    )
    .toEqual(
      {
        lang: {
          code: 'foo',
          name: 'Foo',
          default: true
        },
        path: action.path,
        query: {}
      }
    )
  })
  it('handles LOCATION_CHANGED with not default language', () => {
    const action = {
      type: 'LOCATION_CHANGED',
      path: '/bar/foo/page',
      availableLangs
    }
    expect(
      route(null, action)
    )
    .toEqual(
      {
        lang: {
          code: 'bar',
          name: 'Bar',
          default: false
        },
        path: '/foo/page',
        query: {}
      }
    )
  })
  it('handles LOCATION_CHANGED with root path and default language', () => {
    const action = {
      type: 'LOCATION_CHANGED',
      path: '/',
      availableLangs
    }
    expect(
      route(null, action)
    )
    .toEqual(
      {
        lang: {
          code: 'foo',
          name: 'Foo',
          default: true
        },
        path: action.path,
        query: {}
      }
    )
  })
  it('handles LOCATION_CHANGED with root path and not default language', () => {
    const action = {
      type: 'LOCATION_CHANGED',
      path: '/bar',
      availableLangs
    }
    expect(
      route(null, action)
    )
    .toEqual(
      {
        lang: {
          code: 'bar',
          name: 'Bar',
          default: false
        },
        path: '/',
        query: {}
      }
    )
  })
  it('handles LOCATION_CHANGED with query params', () => {
    const action = {
      type: 'LOCATION_CHANGED',
      path: '/foo',
      query: { foo: 'bar' },
      availableLangs
    }
    expect(
      route(null, action).query
    )
    .toEqual(
      action.query
    )
  })
  it('handles SERVER_REDIRECT', () => {
    const action = {
      type: 'SERVER_REDIRECT',
      path: '/foo'
    }
    expect(
      route(null, action)
    )
    .toEqual(
      { serverRedirect: action.path }
    )
  })
  it('handles other actions and returns unchanged state', () => {
    const state = {
      lang: {
        code: 'foo',
        name: 'Foo'
      },
      path: '/foo',
      query: { foo: 'bar' }
    }
    const action = {
      type: 'FOO_BAR'
    }
    expect(
      route(state, action)
    )
    .toEqual(
      state
    )
  })
})
