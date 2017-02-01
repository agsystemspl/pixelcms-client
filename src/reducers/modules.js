const modules = (state = {}, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case 'LOADING_MODULE':
      if (typeof nextState[action.moduleType] === 'undefined') {
        nextState[action.moduleType] = {}
      }
      nextState[action.moduleType][action.templateId] = { loading: true }
      return nextState
    case 'RECEIVE_MODULE':
      let moduleData
      if (action.data) {
        moduleData = { data: action.data }
      }
      else {
        moduleData = null
      }
      nextState[action.moduleType][action.templateId] = moduleData
      return nextState
    case 'REMOVE_MODULE':
      nextState[action.moduleType][action.templateId] = undefined
      return nextState
    default:
      return state
  }
}

export default modules
