import updateAuthInfo from '../updateAuthInfo'

describe('updateAuthInfo()', () => {
  it('creates UPDATE_AUTH_INFO action with parsed data', () => {
    const authInfo = '"fooAdmin";true'
    const expectedAction = {
      type: 'UPDATE_AUTH_INFO',
      authInfo: {
        user: 'fooAdmin',
        isAdmin: true
      }
    }
    expect(
        updateAuthInfo(authInfo)
    )
    .toEqual(
      expectedAction
    )
  })
})
