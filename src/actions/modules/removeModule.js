const removeModule = (moduleType, templateId) => ({
  type: 'REMOVE_MODULE',
  moduleType,
  templateId
})

export default removeModule
