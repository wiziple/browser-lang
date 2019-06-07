import browserLang from "../src"

const mockNavigator = obj => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      Object.defineProperty(window.navigator, key, {
        value: obj[key],
        configurable: true,
      })
    }
  }
}

const initNavigator = () => {
  mockNavigator({
    languages: undefined,
    language: undefined,
    browserLanguage: undefined,
    userLanguage: undefined,
  })
}

describe("browserLang", () => {
  initNavigator()

  it("should return null when navigator.languages is undefined.", () => {
    expect(browserLang()).toBe(null)
  })

  it('should return "ko_KR" when navigator.languages is defined as ["ko_KR", "ko"]', () => {
    mockNavigator({
      languages: ["ko_KR", "ko"],
    })
    expect(browserLang()).toBe("ko_KR")
  })

  it('should return "ko_KR" when navigator.browserLanguage is defined as "ko_KR"', () => {
    mockNavigator({
      browserLanguage: "ko_KR",
    })
    expect(browserLang()).toBe("ko_KR")
  })

  it("should return fallback when navigator.languages is undefined.", () => {
    const fallback = "ko_KR"
    const options = {
      fallback,
    }
    expect(browserLang(options)).toBe(fallback)
  })

  it("should return fallback when there is no available language on the list.", () => {
    const fallback = "ko_KR"
    mockNavigator({
      languages: ["de"],
    })
    const options = {
      languages: ["fr", "ko", "en"],
      fallback,
    }
    expect(browserLang(options)).toBe(fallback)
  })

  it('should return "zh_TW" when navigator.languages is ["zh_TW"] and "zh_TW" is on the list.', () => {
    mockNavigator({
      languages: ["zh_TW"],
    })
    const options = {
      languages: ["zh", "zh_TW", "en"],
    }
    expect(browserLang(options)).toBe("zh_TW")
  })

  it('should return "zh" when navigator.languages is ["zh_TW"] and only "zh" is on the list.', () => {
    mockNavigator({
      languages: ["zh_TW"],
    })
    const options = {
      languages: ["zh", "en"],
    }
    expect(browserLang(options)).toBe("zh")
  })
})
