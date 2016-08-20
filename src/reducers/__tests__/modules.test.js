import modules from '../modules'

describe('modules reducer', () => {
  it('returns initial state', () => {
    expect(
      modules(undefined, {})
    )
    .toEqual(
      {}
    )
  })
  it('handles LOADING_MODULE with not exisiting module type and not existing module object', () => {
    const state = {
      fooType: {
        fooObject: { data: 'foo' }
      }
    }
    const action = {
      type: 'LOADING_MODULE',
      moduleType: 'fooNewType',
      templateId: 'fooNewObject'
    }
    expect(
      modules(state, action)
    )
    .toEqual(
      {
        fooType: state.fooType,
        fooNewType: {
          fooNewObject: { loading: true }
        }
      }
    )
  })
  it('handles LOADING_MODULE with exisiting module type and not existing module object', () => {
    const state = {
      fooType: {
        fooObject: { data: 'foo' }
      }
    }
    const action = {
      type: 'LOADING_MODULE',
      moduleType: 'fooType',
      templateId: 'fooNewObject'
    }
    expect(
      modules(state, action)
    )
    .toEqual(
      {
        fooType: {
          fooObject: state.fooType.fooObject,
          fooNewObject: { loading: true }
        }
      }
    )
  })
  it('handles LOADING_MODULE with exisiting module type and existing module object', () => {
    const state = {
      fooType: {
        fooObject: { data: 'foo' }
      }
    }
    const action = {
      type: 'LOADING_MODULE',
      moduleType: 'fooType',
      templateId: 'fooObject'
    }
    expect(
      modules(state, action)
    )
    .toEqual(
      {
        fooType: {
          fooObject: { loading: true }
        }
      }
    )
  })
  it('handles RECEIVE_MODULE with data', () => {
    const state = {
      fooType: {
        fooObject: { loading: true },
        fooOtherObject: {
          data: { foo: 'bar' }
        }
      },
      fooOtherType: {
        fooOtherObject: {
          data: { foo: 'bar' }
        }
      }
    }
    const action = {
      type: 'RECEIVE_MODULE',
      moduleType: 'fooType',
      templateId: 'fooObject',
      data: { foo: 'bar' }
    }
    expect(
      modules(state, action)
    )
    .toEqual(
      {
        fooType: {
          fooObject: { data: action.data },
          fooOtherObject: state.fooType.fooOtherObject
        },
        fooOtherType: state.fooOtherType
      }
    )
  })
  it('handles RECEIVE_MODULE without data', () => {
    const state = {
      fooType: {
        fooObject: { loading: true },
        fooOtherObject: {
          data: { foo: 'bar' }
        }
      },
      fooOtherType: {
        fooOtherObject: {
          data: { foo: 'bar' }
        }
      }
    }
    const action = {
      type: 'RECEIVE_MODULE',
      moduleType: 'fooType',
      templateId: 'fooObject',
      data: null
    }
    expect(
      modules(state, action)
    )
    .toEqual(
      {
        fooType: {
          fooObject: null,
          fooOtherObject: state.fooType.fooOtherObject
        },
        fooOtherType: state.fooOtherType
      }
    )
  })
  it('handles other actions and returns unchanged state', () => {
    const state = {
      foo: {
        foo: 'bar'
      }
    }
    const action = {
      type: 'FOO_BAR'
    }
    expect(
      modules(state, action)
    )
    .toEqual(
      state
    )
  })
})
