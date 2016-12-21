const cutLangPrefix = (pathname, langs) => {
  const pathnameArray = pathname.split('/').filter(i => i)
  const possibleLangPrefix = pathnameArray[0]
  const index = langs.map(lang => { return lang.code }).indexOf(possibleLangPrefix)
  if (index > 0) { // 0 means default language which has no prefix
    return '/' + pathnameArray.slice(1).join('/')
  }
  else {
    return pathname
  }
}

export default cutLangPrefix
