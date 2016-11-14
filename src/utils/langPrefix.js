const langPrefix = (path = '', lang) => {
  if (!lang) { return path }
  if (lang.default) { return path }
  if (path === '/') { return '/' + lang.code }
  else { return '/' + lang.code + path }
}

export default langPrefix
