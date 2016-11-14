const page = (state = {}, action) => {
  switch (action.type) {
    case 'REQUSTING_PAGE':
      return {
        requesting: true
      }
    case 'RECEIVE_PAGE':
      return {
        componentName: action.page.componentName,
        componentData: action.page.componentData || {}
      }
    case 'CLEAR_PAGE':
      return {}
    default:
      return state
  }
}

export default page
