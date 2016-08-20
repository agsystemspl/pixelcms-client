const logMissingTranslation = (namespace, lang, t) => {
  if (process.env.NODE_ENV !== 'production') {
    try {
      throw new Error()
    }
    catch (e) {
      console.error('Missing translation:\n [' + namespace + '][' + lang + '] ' + t + '\n', e)
    }
  }
}

const getTranslation = (t, namespace, lang, locale) => {
  try {
    const translation = locale[namespace][lang][t]
    if (!translation) {
      logMissingTranslation(namespace, lang, t)
    }
    return translation || t
  }
  catch (e) {
    if (e instanceof TypeError) {
      logMissingTranslation(namespace, lang, t)
      return t
    }
    else { throw e }
  }
}

export default getTranslation
