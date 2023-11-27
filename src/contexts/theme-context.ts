import { createContext } from "react"
export type themeType = "dark" | "light"
export const ThemeContext = createContext({
  theme: "",
  setTheme: (theme: themeType) => {},
})
