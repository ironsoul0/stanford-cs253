function htmlElementEscape (str) {
  return str
    // This is not for security, but because '&' is the HTML escape character
    // and we don't want the user's input to be treated as an escape sequence.
    .replace(/&/g, '&amp;')

    // Without the '<' character, no HTML tags an be created.
    .replace(/</g, '&lt;')
}
