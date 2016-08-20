import getTranslation from './getTranslation'

const t = (state, t, ns = 'default') => {
  if (state.route.lang.code === 'en') {
    return t
  }
  return getTranslation(t, ns, state.route.lang.code, state.locale)
}

export default t
