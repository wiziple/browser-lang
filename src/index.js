import startsWith from 'lodash/startsWith';

function getBrowserLang() {
  if (typeof window === 'undefined') {
    return null;
  }

  const lang = (window.navigator.languages && window.navigator.languages[0])
    || window.navigator.language
    || window.navigator.browserLanguage
    || window.navigator.userLanguage
    || window.navigator.systemLanguage
    || null;

  return lang;
}

function normalizeCode(code) {
  return code.toLowerCase().replace(/-/, '_');
}

function getPreferredLanguage(options) {
  if (!options) {
    return getBrowserLang();
  }

  const { languages, fallback } = options;
  if (!options.languages) {
    return fallback;
  }

  // some browsers report language as en-US instead of en_US
  const browserLanguage = normalizeCode(getBrowserLang());

  if (!browserLanguage) {
    return fallback;
  }

  const match = languages.filter(lang => normalizeCode(lang) === browserLanguage);

  if (match.length > 0) {
    return match[0] || fallback;
  }

  // en == en_US
  const matchCodeOnly = languages.filter(lang => startsWith(browserLanguage, lang));
  return matchCodeOnly[0] || fallback;
}

export default getPreferredLanguage;
