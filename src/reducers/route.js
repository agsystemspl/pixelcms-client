const route = (state = {}, action) => {
  switch (action.type) {
    case 'LOCATION_CHANGED':
      let langs = action.availableLangs
      let defaultLang = langs[0]
      let splitedPath = action.path.split('/').filter(i => i)
      let pathLang = splitedPath[0]
      let pathLangIndex = langs.map(lang => { return lang.code }).indexOf(pathLang)

      let lang
      if (pathLangIndex > -1 && pathLang !== defaultLang.code) {
        lang = {code: pathLang, name: langs[pathLangIndex].name, default: false}
      }
      else {
        lang = {code: defaultLang.code, name: defaultLang.name, default: true}
      }

      let pathWithoutLang
      if (lang.code === defaultLang.code) {
        pathWithoutLang = action.path
      }
      else {
        pathWithoutLang = '/' + splitedPath.slice(1).join('/')
      }

      return {
        lang,
        path: action.path,
        pathWithoutLang,
        query: action.query || {},
        search: action.search
      }
    default:
      return state
  }
}

export default route
