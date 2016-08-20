import { animateScroll } from 'react-scroll'

const locationChanged = (path, query) => (dispatch, getState) => {
  /* global __CLIENT__ */
  if (__CLIENT__) {
    animateScroll.scrollToTop(getState().config.pageTransitionScrollProps)
  }
  dispatch({
    type: 'LOCATION_CHANGED',
    path,
    query,
    availableLangs: getState().config.langs
  })
}

export default locationChanged
