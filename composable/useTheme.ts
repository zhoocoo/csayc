import { themeChange } from 'theme-change'
import jsCookie from 'js-cookie'
export function themeInit() {
  const appConfig = useAppConfig()
  const theme = useCookie('_c_theme', {
    default: () => appConfig.theme
  })
  const colorMode = useColorMode()
  onMounted(() => {
    themeChange(false)
    colorMode.value = theme.value
  })
  return () => useState('_c_theme', () => theme.value)
}

export function setTheme(theme: string) {
  jsCookie.set('_c_theme', theme)
}
