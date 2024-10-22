const APPEARANCE_KEY = 'appearance'

export const setTheme = (theme: 'dark' | 'light') => {
  const classList = document.documentElement.classList
  if (theme === 'dark') {
    classList.add('dark')
    localStorage.setItem(APPEARANCE_KEY, theme)
  } else if (theme === 'light') {
    classList.remove('dark')
    localStorage.setItem(APPEARANCE_KEY, theme)
  } else {
    const isSysDarMode = window?.matchMedia(
      '(prefers-color-scheme: dark'
    ).matches
    document.documentElement.classList.toggle('dark', isSysDarMode)
  }
}

export const updateAppearance = () => {
  const userPreference: 'dark' | 'light' = localStorage.getItem(
    APPEARANCE_KEY
  ) as 'dark' | 'light'
  setTheme(userPreference)
}
