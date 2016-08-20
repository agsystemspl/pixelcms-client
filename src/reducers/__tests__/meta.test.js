import meta from '../meta'

describe('meta reducer', () => {
  it('returns initial state', () => {
    expect(
      meta(undefined, {})
    )
    .toEqual(
      {}
    )
  })
  it('handles CHANGE_META with data', () => {
    const action = {
      type: 'CHANGE_META',
      meta: {
        title: 'Foo'
      }
    }
    expect(
      meta(null, action)
    )
    .toEqual(
      action.meta
    )
  })
  it('handles CHANGE_META without data', () => {
    const action = {
      type: 'CHANGE_META'
    }
    expect(
      meta(null, action)
    )
    .toEqual(
      {}
    )
  })
  it('handles other actions and returns unchanged state', () => {
    const state = {
      title: 'foo'
    }
    const action = {
      type: 'FOO_BAR'
    }
    expect(
      meta(state, action)
    )
    .toEqual(
      state
    )
  })
})
