import page from '../page'

describe('page reducer', () => {
  it('returns initial state', () => {
    expect(
      page(undefined, {})
    )
    .toEqual(
      {}
    )
  })
  it('handles LOADING_PAGE', () => {
    const action = {
      type: 'LOADING_PAGE'
    }
    expect(
      page(null, action)
    )
    .toEqual(
      { loading: true }
    )
  })
  it('handles RECEIVE_PAGE with componentData', () => {
    const action = {
      type: 'RECEIVE_PAGE',
      page: {
        componentName: 'foo'
      }
    }
    expect(
      page(null, action)
    )
    .toEqual(
      {
        componentName: 'foo',
        componentData: {}
      }
    )
  })
  it('handles RECEIVE_PAGE without componentData', () => {
    const action = {
      type: 'RECEIVE_PAGE',
      page: {
        componentName: 'foo',
        componentData: { foo: 'bar' }
      }
    }
    expect(
      page(null, action)
    )
    .toEqual(
      action.page
    )
  })
  it('handles CLEAR_PAGE', () => {
    const action = {
      type: 'CLEAR_PAGE'
    }
    expect(
      page(null, action)
    )
    .toEqual(
      {}
    )
  })
  it('handles other actions and returns unchanged state', () => {
    const state = {
      componentName: 'foo',
      componentData: { foo: 'bar' }
    }
    const action = {
      type: 'FOO_BAR'
    }
    expect(
      page(state, action)
    )
    .toEqual(
      state
    )
  })
})
