import { createContext } from 'react'
export type themeType = 'dark' | 'light'

export interface IThemeContext {
  theme: string
  setTheme: (theme: themeType) => void
}

export const ThemeContext = createContext<IThemeContext>({
  theme: '',
  setTheme: (theme: themeType) => {}
})
