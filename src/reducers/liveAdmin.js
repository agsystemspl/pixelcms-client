const initialState = {
  markEditableContent: false,
  showAdminLinks: false
}

const liveAdmin = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MARK_EDITABLE_CONTENT':
      return Object.assign({}, state, { markEditableContent: !state.markEditableContent })
    case 'TOGGLE_SHOW_ADMIN_LINKS':
      return Object.assign({}, state, { showAdminLinks: !state.showAdminLinks })
    default:
      return state
  }
}

export default liveAdmin
