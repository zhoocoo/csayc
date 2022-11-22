import jsCookie from 'js-cookie'

export const useTheme = () => useState('theme')

export function themeInit() {
  const appConfig = useAppConfig()
  const colorMode = useColorMode()
  console.log(colorMode)
  const theme = useCookie('theme', {
    default: () => colorMode.value || appConfig.theme
  })
  const themeState = useTheme()
  themeState.value = theme.value
  return themeState
}

export type TThemeMap = 'system' | 'dark' | 'cupcake'

export function setTheme(theme: TThemeMap) {
  const themeRef = useTheme()
  const colorMode = useColorMode()
  colorMode.preference = theme
  themeRef.value = theme
  jsCookie.set('theme', theme)
}
