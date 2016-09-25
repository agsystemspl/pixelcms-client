import cookie from 'react-cookie'

const toggleMarkEditableContent = (setCookie = true) => (dispatch, getState) => {
  if (setCookie) {
    if (!getState().liveAdmin.markEditableContent) {
      cookie.save('liveAdminMarkEditableContent', 1, { path: '/' })
    }
    else {
      cookie.remove('liveAdminMarkEditableContent', { path: '/' })
    }
  }
  dispatch({
    type: 'TOGGLE_MARK_EDITABLE_CONTENT'
  })
}

export default toggleMarkEditableContent
