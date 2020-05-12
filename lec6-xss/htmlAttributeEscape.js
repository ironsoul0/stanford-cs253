function htmlAttributeEscape (str) {
  return str
    // This is not for security, but because '&' is the HTML escape character
    // and we don't want the user's input to be treated as an escape sequence.
    .replace(/&/g, '&amp;')

    // Without the single quote character, the attacker cannot escape from
    // inside a single-quoted HTML attribute.
    .replace(/'/g, '&apos;')

    // Without the double quote character, the attacker cannot escape from
    // inside a double-quoted HTML attribute.
    .replace(/"/g, '&quot;')
}

