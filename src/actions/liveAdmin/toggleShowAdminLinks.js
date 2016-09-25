import cookie from 'react-cookie'
import ReactTooltip from 'react-tooltip'

const toggleShowAdminLinks = (setCookie = true) => (dispatch, getState) => {
  if (setCookie) {
    if (!getState().liveAdmin.showAdminLinks) {
      cookie.save('liveAdminShowAdminLinks', 1, { path: '/' })
    }
    else {
      cookie.remove('liveAdminShowAdminLinks', { path: '/' })
    }
  }
  setTimeout(() => ReactTooltip.rebuild(), 0)
  dispatch({
    type: 'TOGGLE_SHOW_ADMIN_LINKS'
  })
}

export default toggleShowAdminLinks
