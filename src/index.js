function startsWith(string, target, position) {
  const { length } = string
  position = position == null ? 0 : position
  if (position < 0) {
    position = 0
  } else if (position > length) {
    position = length
  }
  target = `${target}`
  return string.slice(position, position + target.length) == target
}

function getBrowserLang() {
  if (typeof window === "undefined") {
    return null
  }

  const lang =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.browserLanguage ||
    window.navigator.userLanguage ||
    window.navigator.systemLanguage ||
    null

  return lang
}

function normalizeCode(code) {
  return code.toLowerCase().replace(/-/, "_")
}

function getPreferredLanguage(options) {
  if (!options) {
    return getBrowserLang()
  }

  const { languages, fallback } = options
  if (!options.languages) {
    return fallback
  }

  // some browsers report language as en-US instead of en_US
  const browserLanguage = normalizeCode(getBrowserLang())

  if (!browserLanguage) {
    return fallback
  }

  const match = languages.filter(
    lang => normalizeCode(lang) === browserLanguage
  )

  if (match.length > 0) {
    return match[0] || fallback
  }

  // en == en_US
  const matchCodeOnly = languages.filter(lang =>
    startsWith(browserLanguage, lang) || startsWith(lang, browserLanguage)
  )
  return matchCodeOnly[0] || fallback
}

export default getPreferredLanguage
