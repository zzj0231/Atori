const APPEARANCE_KEY = 'appearance'

export const setTheme = (theme: 'dark' | 'light') => {
  const classList = document.documentElement.classList
  if (theme === 'dark') {
    classList.add('dark')
  } else {
    classList.remove('dark')
  }
  localStorage.setItem(APPEARANCE_KEY, theme)
}

export const updateAppearance = () => {
  const userPreference: 'dark' | 'light' = localStorage.getItem(
    APPEARANCE_KEY
  ) as 'dark' | 'light'
  setTheme(userPreference)
}
