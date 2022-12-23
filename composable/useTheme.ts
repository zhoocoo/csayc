import jsCookie from 'js-cookie'

const OUT_TIME = 60 * 60 * 24 * 31

export function useTheme() {
  const appConfig = useAppConfig()
  const colorMode = useColorMode()
  const theme = useCookie('theme', {
    default: () => colorMode.value || appConfig.theme,
    maxAge: OUT_TIME
  })
  const themeState = useState<string | undefined | null>(
    'theme',
    () => theme.value
  )
  return themeState
}

export type TThemeMap = 'system' | 'dark' | 'cupcake'

export function setTheme(theme: TThemeMap | string) {
  const themeRef = useTheme()
  const colorMode = useColorMode()
  colorMode.preference = theme
  themeRef.value = theme
  jsCookie.set('theme', theme, {
    expires: OUT_TIME
  })
}
