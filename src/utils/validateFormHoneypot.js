const validateFormHoneypot = data => {
  const errors = {}
  if (data.yourName) {
    errors.yourName = true
  }
  return errors
}

export default validateFormHoneypot
